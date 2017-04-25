'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConnectionFromMongoCursor = function () {
  function ConnectionFromMongoCursor() {
    _classCallCheck(this, ConnectionFromMongoCursor);
  }

  _createClass(ConnectionFromMongoCursor, null, [{
    key: 'cursorToOffset',


    /**
     * Rederives the offset from the cursor string
     */
    value: function cursorToOffset(cursor) {
      return parseInt(ConnectionFromMongoCursor.unbase64(cursor).substring(ConnectionFromMongoCursor.PREFIX.length), 10);
    }

    /**
     * Given an optional cursor and a default offset, returns the offset to use;
     * if the cursor contains a valid offset, that will be used, otherwise it will
     * be the default.
     */

  }, {
    key: 'getOffsetWithDefault',
    value: function getOffsetWithDefault(cursor, defaultOffset) {
      if (cursor === undefined || cursor === null) {
        return defaultOffset;
      }
      var offset = ConnectionFromMongoCursor.cursorToOffset(cursor);
      return isNaN(offset) ? defaultOffset : offset;
    }

    /**
     * Creates the cursor string from an offset.
     */

  }, {
    key: 'offsetToCursor',
    value: function offsetToCursor(offset) {
      return ConnectionFromMongoCursor.base64(ConnectionFromMongoCursor.PREFIX + offset);
    }

    /**
     * Accepts a mongodb cursor and connection arguments, and returns a connection
     * object for use in GraphQL. It uses array offsets as pagination, so pagiantion
     * will work only if the data set is satic.
     */

  }, {
    key: 'connectionFromMongoCursor',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(context, inMongoCursor) {
        var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var loader = arguments[3];
        var mongodbCursor, after, before, first, last, count, beforeOffset, afterOffset, startOffset, endOffset, skip, limit, slice, edges, firstEdge, lastEdge, lowerBound, upperBound;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                mongodbCursor = inMongoCursor;
                after = args.after, before = args.before;
                first = args.first, last = args.last;

                // Limit the maximum number of elements in a query

                if (!first && !last) first = 10;
                if (first > 1000) first = 1000;
                if (last > 1000) last = 1000;

                _context.next = 8;
                return inMongoCursor.count();

              case 8:
                count = _context.sent;

                // returning mongoose query obj to find again after count
                inMongoCursor.find();

                beforeOffset = ConnectionFromMongoCursor.getOffsetWithDefault(before, count);
                afterOffset = ConnectionFromMongoCursor.getOffsetWithDefault(after, -1);
                startOffset = Math.max(-1, afterOffset) + 1;
                endOffset = Math.min(count, beforeOffset);


                if (first !== undefined) {
                  endOffset = Math.min(endOffset, startOffset + first);
                }
                if (last !== undefined) {
                  startOffset = Math.max(startOffset, endOffset - last);
                }

                skip = Math.max(startOffset, 0);
                limit = endOffset - startOffset;

                // If supplied slice is too large, trim it down before mapping over it.

                mongodbCursor.skip(skip);
                mongodbCursor.limit(limit);

                // Short circuit if limit is 0; in that case, mongodb doesn't limit at all
                _context.next = 22;
                return mongodbCursor.exec();

              case 22:
                slice = _context.sent;
                edges = slice.map(function (value, index) {
                  return {
                    cursor: ConnectionFromMongoCursor.offsetToCursor(startOffset + index),
                    node: loader(context, value._id)
                  };
                });
                firstEdge = edges[0];
                lastEdge = edges[edges.length - 1];
                lowerBound = after ? afterOffset + 1 : 0;
                upperBound = before ? Math.min(beforeOffset, count) : count;
                return _context.abrupt('return', {
                  edges: edges,
                  count: count,
                  pageInfo: {
                    startCursor: firstEdge ? firstEdge.cursor : null,
                    endCursor: lastEdge ? lastEdge.cursor : null,
                    hasPreviousPage: last !== null ? startOffset > lowerBound : false,
                    hasNextPage: first !== null ? endOffset < upperBound : false
                  }
                });

              case 29:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function connectionFromMongoCursor(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return connectionFromMongoCursor;
    }()
  }]);

  return ConnectionFromMongoCursor;
}();

ConnectionFromMongoCursor.PREFIX = 'mongo:';

ConnectionFromMongoCursor.base64 = function (str) {
  return new Buffer(str, 'ascii').toString('base64');
};

ConnectionFromMongoCursor.unbase64 = function (b64) {
  return new Buffer(b64, 'base64').toString('ascii');
};

exports.default = ConnectionFromMongoCursor;