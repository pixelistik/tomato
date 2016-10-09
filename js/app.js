"use strict";

var Vue = require("vue");

window.vm = new Vue({
    el: "#app",
    data: {
        title: "One",
        workStartedTime: false,
        pauseStartedTime: false,
        now: new Date(),
        timer: false,
        notificationShown: false
    },
    created: function () {
        this.timer = setInterval(this.updateTimes, 1000);
    },
    methods: {
        startWorking: function () {
            console.debug("startng to work");
            this.workStartedTime = new Date();
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
