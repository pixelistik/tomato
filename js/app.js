"use strict";

var Vue = require("vue");
var Log = require("./log.js")();
var log = new Log();

window.vm = new Vue({
    el: "#app",
    data: {
        title: "One",
        workStartedTime: false,
        pauseStartedTime: false,
        now: new Date(),
        timer: false,
        notificationShown: false,
        entries: [
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
            },{
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
        ],
        log: new Log()
    },
    created: function () {
        this.timer = setInterval(this.updateTimes, 1000);
    },
    methods: {
        startWork: function () {
            console.debug("startng to work");
            this.workStartedTime = new Date();
            this.entries.push({
                type: log.START_WORK,
                time: new Date()
            });
        },
        startPause: function () {
            console.debug("startng to pause");
            this.workStartedTime = new Date();
            this.entries.push({
                type: log.START_PAUSE,
                time: new Date()
            });
        },
        finishPause: function () {
            console.debug("finish pause");
            this.workStartedTime = new Date();
            this.entries.push({
                type: log.FINISH_PAUSE,
                time: new Date()
            });
        },
        updateTimes: function () {
            console.debug("Updating");
            this.now = new Date();
            if (this.workingTime > 10 && !this.notificationShown) {
                showNotification();
                this.notificationShown = true;
            }
        }
    },
    computed: {
        workingTime: function () {
            if (!this.workStartedTime) return 0;
            return Math.round((this.now - this.workStartedTime) / 1000);
        },
        tomatoes: function () {
            return this.log.tomatoes(this.entries);
        }
    }

});

function showNotification() {
    Notification.requestPermission(function (result) {
        if (result === "granted") {
            navigator.serviceWorker.ready.then(function (registration) {
                registration.showNotification("Start a pause", {
                    body: "Buzz! Buzz!",
                    icon: "apple-touch-icon.png",
                    vibrate: [200, 100, 200, 100, 200, 100, 200],
                    tag: "vibration-sample"
                });
            });
        }
    });
}
