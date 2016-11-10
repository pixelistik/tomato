"use strict";

var LogFactory = function () {
    var Log = function () {
        this.WORK_TIME = 25 * 60 * 1000;
        this.PAUSE_TIME = 5 * 60 * 1000;

        var isCompleteTomato = function (entry1, entry2, entry3) {
            if (!(
                entry1.type === this.START_WORK &&
                entry2.type === this.START_PAUSE &&
                entry3.type === this.FINISH_PAUSE
            )) {
                return false;
            }

            return (
                entry2.time - entry1.time > this.WORK_TIME &&
                entry3.time - entry2.time > this.PAUSE_TIME
            );
        }.bind(this);

        this.tomatoes = function (logEntries) {
            var tomatoes = [];

            logEntries.forEach(function (entry, index) {
                if (entry.type === this.START_WORK) {
                    tomatoes.push(
                        {
                            complete: isCompleteTomato(logEntries[index], logEntries[index + 1], logEntries[index + 2])
                        }
                    );
                }
            }.bind(this));

            return tomatoes;
        }.bind(this);

        this.START_WORK = 0;
        this.START_PAUSE = 1;
        this.FINISH_PAUSE = 2;

    };

    return Log;
};

module.exports = LogFactory;
