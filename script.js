console.clear();
function Time() {
  this.hours = NaN;
  this.minutes = NaN;
  this.seconds = NaN;
  this.any = function() {
    return (!!this.hours || !!this.minutes || !!this.seconds);
  },
  this.toSeconds = function() {
    const hrs = !isNaN(this.hours) ? this.hours * 60 * 60 : 0;
    const mins = !isNaN(this.minutes) ? this.minutes * 60 : 0;
    const secs = !isNaN(this.seconds) ? this.seconds : 0;
    return +hrs + +mins + +secs;
  }
  this.fromSeconds = function(seconds) {
    const hrs = seconds / (60 * 60);
    const mins = (hrs % 1) * 60;
    const secs = (mins % 1) * 60;
    this.hours = Math.floor(hrs).toString().padStart(2,'0');
    this.minutes = Math.floor(mins).toString().padStart(2,'0');
    this.seconds = Math.floor(secs).toString().padStart(2,'0');
  }
  this.reset = function() {
    this.hours = NaN;
    this.minutes = NaN;
    this.seconds = NaN;
  }
}

const races = {
  'marathon': 42.195,
  'halfMarathon': 21.0975,
  'fiveK': 5,
  'tenK': 10,
};

const vue = new Vue({ 
  el: '#app',
  data () {
    return {
      time: new Time(),
      distance: {
        value: NaN,
        units: 'Mi',
        race: ''
      },
      pace: new Time(),
      lastModified: []
    }
  },
  methods: {
    round(num) {
      return Math.round((num + Number.EPSILON) * 100) / 100
    },
    toKm(mi) {
      return this.round(mi * 1.609);
    },
    toMiles(km) {
      return this.round(km / 1.609);
    },
    calculate() {
      if (this.lastModified.includes('distance') && this.lastModified.includes('time')) {
        this.updatePace();
      }
      if (this.lastModified.includes('distance') && this.lastModified.includes('pace')) {
        this.updateTime();
      }
      if (this.lastModified.includes('pace') && this.lastModified.includes('time')) {
        this.updateDistance();
      }
    },
    updateTime() {
      const seconds = this.pace.toSeconds();
      this.time.fromSeconds(seconds * this.distance.value);
    },
    updateDistance() {
      this.distance.value = this.time.toSeconds() / this.pace.toSeconds();
    },
    updatePace() {
      const seconds = this.time.toSeconds();
      this.pace.fromSeconds(seconds / this.distance.value);
    },
    updateLastModified(str) {
      if (!this.lastModified.includes(str)) {
        this.lastModified.unshift(str)
      }
      if (this.lastModified.length > 2) {
        this.lastModified.pop();
      }
    },
    updateUnits() {
      const distance = this.distance.value;
      if (this.distance.units === 'Km') {
        this.distance.value = this.toKm(distance);
        this.updatePace();
      } else {
        this.distance.value = this.toMiles(distance);
        this.updatePace();
      }
    },
    updateRace() {
      const raceK = races[this.distance.race];
      if (this.distance.units === 'Km') {
        this.distance.value = raceK;
      } else {
        this.distance.value = this.toMiles(raceK);
      }
      this.updateLastModified('distance');
    },
    reset() {
      this.pace.reset();
      this.time.reset();
      this.distance.value = NaN;
      this.lastModified = [];
    }
  }
});