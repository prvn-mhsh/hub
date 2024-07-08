// JavaScript to handle text rotation effect
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const skills = [
    { selector: '.progress-html', className: 'animate-90' },
    { selector: '.progress-css', className: 'animate-85' },
    { selector: '.progress-js', className: 'animate-75' },
    { selector: '.progress-react', className: 'animate-80' },
    { selector: '.progress-node', className: 'animate-70' }
  ];

  const skillLink = document.querySelector('.menu li a[href="#section2"]');
  const section2 = document.querySelector('#section2');

  if (skillLink) {
    skillLink.addEventListener('click', (event) => {
      event.preventDefault();
      section2.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skills.forEach(skill => {
          const progressElement = document.querySelector(skill.selector);
          if (progressElement) {
            // Remove animation class if it exists to restart the animation
            progressElement.classList.remove('animate-90', 'animate-85', 'animate-75', 'animate-80', 'animate-70');
            
            // Trigger reflow to restart the animation
            void progressElement.offsetWidth;
            
            // Add the correct animation class
            progressElement.classList.add(skill.className);
          }
        });
      }
    });
  }, {
    threshold: 0.5 // Adjust the threshold as needed
  });

  if (section2) {
    observer.observe(section2);
  }
});
