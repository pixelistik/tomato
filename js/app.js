"use strict";

var Vue = require("vue");

window.vm = new Vue({
    el: "#app",
    data: {
        title: "One",
        workStartedTime: false,
        pauseStartedTime: false,
        now: new Date(),
        timer: false
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
        }
    },
    computed: {
        workingTime: function () {
            return Math.round((this.now - this.workStartedTime) / 1000);
        }
    }

});
