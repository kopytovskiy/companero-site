/*
Template Name: Appvilla - Creative Landing Page HTML Template.
Author: GrayGrids
*/

(function () {
    //===== Prealoder

    window.onload = function () {
        window.setTimeout(fadeout, 500);
    }

    function fadeout() {
        document.querySelector('.preloader').style.opacity = '0';
        document.querySelector('.preloader').style.display = 'none';
    }


    /*=====================================
    Sticky
    ======================================= */
    window.onscroll = function () {
        var header_navbar = document.querySelector(".navbar-area");
        var sticky = header_navbar.offsetTop;

        var logo = document.querySelector('.navbar-brand img')
        if (window.pageYOffset > sticky) {
          header_navbar.classList.add("sticky");
          logo.src = 'assets/images/logo/logo.webp';
        } else {
          header_navbar.classList.remove("sticky");
          logo.src = 'assets/images/logo/white-logo.webp';
        }

        // show or hide the back-top-top button
        var backToTo = document.querySelector(".scroll-top");
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            backToTo.style.display = "flex";
        } else {
            backToTo.style.display = "none";
        }
    };


    
    // section menu active
	function onScroll(event) {
		var sections = document.querySelectorAll('.page-scroll');
		var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

		for (var i = 0; i < sections.length; i++) {
			var currLink = sections[i];
			var val = currLink.getAttribute('href');
			var refElement = document.querySelector(val);
			var scrollTopMinus = scrollPos + 73;
			if (refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
				document.querySelector('.page-scroll').classList.remove('active');
				currLink.classList.add('active');
			} else {
				currLink.classList.remove('active');
			}
		}
	};

    window.document.addEventListener('scroll', onScroll);
    
    // for menu scroll 
    var pageLink = document.querySelectorAll('.page-scroll');

    pageLink.forEach(elem => {
        elem.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(elem.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                offsetTop: 1 - 60,
            });
        });
    });

    // WOW active
    new WOW().init();

    function initHeroTyping() {
        var wordContainer = document.querySelector('.hero-typing-word');
        if (!wordContainer) {
            return;
        }
        var wordElement = wordContainer.querySelector('.hero-typing-text') || wordContainer;

        var words = ['Hitchhiking.', 'Ridesharing.'];
        var timings = {
            typing: 100,
            deleting: 65,
            holdAfterType: 1200,
            holdAfterDelete: 300,
            defaultStartDelay: 1400,
        };
        var maxLength = words.reduce(function (longest, current) {
            return Math.max(longest, current.length);
        }, 0);

        wordContainer.style.minWidth = maxLength + 'ch';

        var reducedMotion = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reducedMotion) {
            wordElement.textContent = words[0];
            wordContainer.classList.add('hero-typing-static');
            return;
        }

        var heading = wordContainer.closest('h1');
        var wowDelay = 0;
        if (heading) {
            var delayAttr = heading.getAttribute('data-wow-delay') || '';
            var delayValue = parseFloat(delayAttr.replace('s', ''));
            if (!isNaN(delayValue)) {
                wowDelay = delayValue * 1000;
            }
        }

        var startDelay = Math.max(timings.defaultStartDelay, wowDelay + 1000);
        var wordIndex = 0;
        var charIndex = 0;
        var deleting = false;

        wordElement.textContent = '';

        function tick() {
            wordContainer.classList.remove('hero-typing-caret-idle');

            var currentWord = words[wordIndex];

            if (deleting) {
                charIndex = Math.max(charIndex - 1, 0);
            } else {
                charIndex = Math.min(charIndex + 1, currentWord.length);
            }

            wordElement.textContent = currentWord.substring(0, charIndex);

            if (!deleting && charIndex === currentWord.length) {
                deleting = true;
                wordContainer.classList.add('hero-typing-caret-idle');
                window.setTimeout(tick, timings.holdAfterType);
                return;
            }

            if (deleting && charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                window.setTimeout(tick, timings.holdAfterDelete);
                return;
            }

            window.setTimeout(tick, deleting ? timings.deleting : timings.typing);
        }

        window.setTimeout(tick, startDelay);
    }

    initHeroTyping();

    let filterButtons = document.querySelectorAll('.portfolio-btn-wrapper button');
    filterButtons.forEach(e =>
        e.addEventListener('click', () => {

            let filterValue = event.target.getAttribute('data-filter');
            iso.arrange({
                filter: filterValue
            });
        })
    );

    var elements = document.getElementsByClassName("portfolio-btn");
    for (var i = 0; i < elements.length; i++) {
        elements[i].onclick = function () {
            var el = elements[0];
            while (el) {
                if (el.tagName === "BUTTON") {
                    el.classList.remove("active");
                }
                el = el.nextSibling;
            }
            this.classList.add("active");
        };
    };

    //===== mobile-menu-btn
    let navbarToggler = document.querySelector(".mobile-menu-btn");
    navbarToggler.addEventListener('click', function () {
        navbarToggler.classList.toggle("active");
    });


})();
