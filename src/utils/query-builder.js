const R = require('ramda');
const moment = require('moment');

const reviewObj = store => (store === 'google' ? {
  lang: '$lang',
  id: '$id',
  updated: '$updated',
  userName: '$userName',
  userImage: '$userImage',
  date: '$date',
  url: '$url',
  title: '$title',
  text: '$text',
  score: '$score',
  replyDate: '$replyDate',
  replyText: '$replyText',
} : {
  id: '$id',
  updated: '$updated',
  userName: '$userName',
  userUrl: '$userUrl',
  date: '$date',
  url: '$url',
  title: '$title',
  text: '$text',
  version: '$version',
  score: '$score',
});

const buildProjectionPagging = (opts) => {
  const limit = opts.limit ? parseInt(opts.limit, 10) : 40;
  const skip = opts.page ? (opts.page * limit) : 0;

  return {
    appId: '$appId',
    total: { $size: '$reviews' },
    store: '$store',
    reviews: {
      $slice: ['$reviews', skip, limit],
    },
  };
};

const buildCond = (opts) => {
  let cond = {};

  if (opts.score) {
    cond = R.assoc('score', { $eq: parseInt(opts.score, 10) }, cond);
  }

  if (opts.version) {
    cond = R.assoc('version', { $eq: opts.version }, cond);
  }

  if (opts.replied === 'missing') {
    cond = R.assoc('replyText', { $exists: false }, cond);
  }

  return cond;
};

const buildReviewFilter = R.ifElse(
  R.propEq('store', 'google'),
  R.pick(['appId', 'store', 'lang']),
  R.pick(['appId', 'store', 'country'])
);

const scoreClassification = {
  $switch: {
    branches: [
      {
        case: { $gt: ['$score', 3] },
        then: 'POSITIVE',
      },
      {
        case: { $lt: ['$score', 3] },
        then: 'NEGATIVE',
      }
    ],
    default: 'NEUTRAL',
  },
};

const getReviews = (opts) => {
  const { start, end } = opts;

  const dayStart = (start) ? moment(start).startOf('day').toDate() : moment().subtract(30, 'days').startOf('day').toDate();
  const dayEnd = (end) ? moment(end).endOf('day').toDate() : moment().endOf('day').toDate();

  const filter = buildReviewFilter(opts);
  const match = R.assoc('date', { $gte: dayStart, $lt: dayEnd }, filter);

  const cond = buildCond(opts, dayStart, dayEnd);
  const projectPagging = buildProjectionPagging(opts);

  return [
    { $match: R.merge(match, cond) },
    {
      $sort: {
        date: -1,
      },
    },
    {
      $group:
         {
           _id: { appId: '$appId', store: '$store' },
           reviews: { $push: reviewObj(opts.store) },
         },
    },
    {
      $project: {
        _id: 0,
        appId: '$_id.appId',
        store: '$_id.store',
        reviews: '$reviews',
      },
    }
  ];
};

const getReviewsRepliedByScore = (opts) => {
  const { start, end, sortBy } = opts;

  const dayStart = (start) ? moment(start).startOf('day').toDate() : moment().subtract(30, 'days').startOf('day').toDate();
  const dayEnd = (end) ? moment(end).endOf('day').toDate() : moment().endOf('day').toDate();

  const filter = buildReviewFilter(opts);
  const match = R.assoc('date', { $gte: dayStart, $lt: dayEnd }, filter);

  const id = sortBy === 'MONTH' ?
    { month: { $month: '$date' }, year: { $year: '$date' } } :
    { score: '$score' };


  const query = [
    { $match: match },
    {
      $group: {
        _id: id,
        replieds: {
          // $sum: { $cond: { if: { $ne: [{ $type: '$replyText' }, 'missing'] }, then: 1, else: 0 } },
        },
        nonReplieds: {
          // $sum: { $cond: { if: { $ne: [{ $type: '$replyText' }, 'missing'] }, then: 0, else: 1 } },
        },
      },
    },
    {
      $project: {
        _id: 0,
        score: '$_id.score',
        month: '$_id.month',
        year: '$_id.year',
        total: { $add: ['$replieds', '$nonReplieds'] },
        'replieds.quantity': '$replieds',
        'replieds.percentual': {
          $cond: {
            if: { $gt: ['$replieds', 0] },
            then: {
              $divide: [
                { $multiply: ['$replieds', 100] },
                { $add: ['$replieds', '$nonReplieds'] }
              ],
            },
            else: 0,
          },
        },
        'nonReplieds.quantity': '$nonReplieds',
        'nonReplieds.percentual': {
          $cond: {
            if: { $gt: ['$nonReplieds', 0] },
            then: {
              $divide: [
                { $multiply: ['$nonReplieds', 100] },
                { $add: ['$replieds', '$nonReplieds'] }
              ],
            },
            else: 0,
          },
        },

      },
    },
    { $sort: { score: 1, year: 1, month: 1 } }
  ];

  return query;
};

const getReviewsVersions = (opts) => {
  const field = 'version';
  const query = R.pick(['appId', 'country'], opts);
  return [field, query];
};

const getReviewsClassification = (opts) => {
  const { start, end, groupBy = 'day' } = opts;
  const dayStart = (start) ? moment(start).startOf('day').toDate() : moment().subtract(30, 'days').startOf('day').toDate();
  const dayEnd = (end) ? moment(end).endOf('day').toDate() : moment().endOf('day').toDate();
  const filter = buildReviewFilter(opts);

  const match = Object.assign(
    filter,
    { date: { $gte: dayStart, $lt: dayEnd } }
  );

  const query = [
    { $match: match },
    {
      $project: {
        month: { $month: '$date' },
        week: { $week: '$date' },
        dayOfWeek: { $dayOfWeek: '$date' },
        day: '$date',
        classification: scoreClassification,
      },
    },
    {
      $group: {
        _id: {
          date: `$${groupBy}`,
          classification: '$classification',
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        date: '$_id.date',
        classification: '$_id.classification',
        count: '$count',
      },
    },
    {
      $sort: {
        date: -1, classification: -1,
      },
    }
  ];
  return query;
};

const getQuantityRepliedReviews = opts => [
  { $match: R.pick(['appId', 'store', 'lang'], opts) },
  {
    $group: {
      _id: null,
      appId: { $first: '$appId' },
      total: { $sum: 1 },
      subtotal: { $sum: { $cond: { if: { $ne: [{ $type: '$replyText' }, 'missing'] }, then: 1, else: 0 } } },
    },
  }
];

const getFindUserApps = (app) => {
  const query = {
    $or: [
      { 'apps.internalId': R.prop(['internalId'], app) },
      { 'apps.competitors.internalId': R.prop(['internalId'], app) }
    ],
  };
  return query;
};

const getRatings = (opts) => {
  const {
    start, end, appId, country, lang,
  } = opts;

  const dayStart = (start) ? moment(start).startOf('day').toDate() : moment().subtract(90, 'days').startOf('day').toDate();
  const dayEnd = (end) ? moment(end).endOf('day').toDate() : moment().endOf('day').toDate();
  const dayOfWeek = moment(dayEnd).add(1, 'hour').weekday();

  const filter = {
    appId,
    'metadata.country': country,
    'metadata.date': { $gte: dayStart, $lt: dayEnd },
  };

  const match = lang
    ? R.merge(filter, { 'metadata.lang': lang })
    : filter;

  const query = [
    { $match: match },
    {
      $group: {
        _id: {
          dayOfWeek: { $dayOfWeek: '$metadata.date' },
          date: '$metadata.date',
          histogram: '$histogram',
          ratings: '$ratings',
        },
      },
    },
    {
      $match: { '_id.dayOfWeek': dayOfWeek },
    },
    {
      $project: {
        _id: 0,
        date: '$_id.date',
        histogram: '$_id.histogram',
        ratings: '$_id.ratings',
      },
    },
    {
      $sort: { date: 1 },
    }
  ];
  return query;
};

const getVisibilityScore = (opts, internalId) => {
  const { start, end, week } = opts;
  const startDate = moment(start).startOf('day').toDate();
  const endDate = moment(end).endOf('day').toDate();
  const dayOfWeek = moment(end).day();
  const find = week ? { $where: () => this.date.getDay === dayOfWeek } : {};
  const query = R.merge({
    internalId,
    date: { $gte: startDate, $lte: endDate },
  }, find);

  return query;
};

module.exports = {
  getReviews,
  getReviewsRepliedByScore,
  // getReviewsVersions,
  // getReviewsClassification,
  // getQuantityRepliedReviews,
  getFindUserApps,
  getRatings,
  getVisibilityScore,
};
