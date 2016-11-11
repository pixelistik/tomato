"use strict";

var assert = require("chai").assert;
var Log = require("../js/log.js")();

describe("Mapping log entries to finished/unfinished tomatoes", function () {
    it("should convert 1 finished tomato correctly", function () {
        var log = new Log();

        var entries = [
            {
                type: log.START_WORK,
                time: Date.parse("2016-01-01T12:00:00")
            },
            {
                type: log.START_PAUSE,
                time: Date.parse("2016-01-01T12:26:00")
            },
            {
                type: log.FINISH_PAUSE,
                time: Date.parse("2016-01-01T12:32:00")
            }
        ];

        var result = log.tomatoes(entries);
        var expected = [
            {
                complete: true
            }
        ];

        assert.deepEqual(result, expected);
    });

    it("should convert 1 unfinished tomato correctly", function () {
        var log = new Log();

        var entries = [
            {
                type: log.START_WORK,
                time: Date.parse("2016-01-01T12:00:00")
            },
            {
                type: log.START_PAUSE,
                time: Date.parse("2016-01-01T12:01:00")
            },
            {
                type: log.FINISH_PAUSE,
                time: Date.parse("2016-01-01T12:02:00")
            }
        ];

        var result = log.tomatoes(entries);
        var expected = [
            {
                complete: false
            }
        ];

        assert.deepEqual(result, expected);
    });

    it("should discover 1 finished tomato correctly after preceding pause", function () {
        var log = new Log();

        var entries = [
            {
                type: log.FINISH_PAUSE,
                time: Date.parse("2016-09-09T23:12:34")
            },
            {
                type: log.START_WORK,
                time: Date.parse("2016-01-01T12:00:00")
            },
            {
                type: log.START_PAUSE,
                time: Date.parse("2016-01-01T12:26:00")
            },
            {
                type: log.FINISH_PAUSE,
                time: Date.parse("2016-01-01T12:32:00")
            }
        ];

        var result = log.tomatoes(entries);
        var expected = [
            {
                complete: true
            }
        ];

        assert.deepEqual(result, expected);
    });

    it("should not throw exception on unfinished tomato", function () {
        var log = new Log();

        var entries = [
            {
                type: log.START_WORK,
                time: Date.parse("2016-01-01T12:00:00")
            }
        ];

        var result = log.tomatoes(entries);
        var expected = [
            {
                complete: false
            }
        ];

        assert.deepEqual(result, expected);
    });
});
