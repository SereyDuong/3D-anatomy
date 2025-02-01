// // Smooth Scroll

// var html = document.documentElement;
// var body = document.body;

// var scroller = {
//     target: document.querySelector("#js-scroll-content"),
//     ease: 0.08, // <= scroll speed
//     endY: 0,
//     y: 0,
//     resizeRequest: 1,
//     scrollRequest: 0,
// };

// var requestId = null;
// var isAnchorClick = false; // Flag to disable smooth scroll during anchor link clicks

// TweenLite.set(scroller.target, {
//     rotation: 0.001,
//     force3D: true,
// });

// window.addEventListener("load", onLoad);

// function onLoad() {
//     updateScroller();
//     window.focus();
//     window.addEventListener("resize", onResize);
//     document.addEventListener("scroll", onScroll);
// }

// function updateScroller() {
//     if (isAnchorClick) {
//         // During anchor link click, skip the smooth scrolling logic
//         scroller.y = window.pageYOffset || html.scrollTop || body.scrollTop || 0;
//         TweenLite.set(scroller.target, {
//             y: -scroller.y,
//         });
//         return; // Exit to prevent smooth scrolling while an anchor link is active
//     }

//     var resized = scroller.resizeRequest > 0;

//     if (resized) {
//         var height = scroller.target.clientHeight;
//         body.style.height = height + "px";
//         scroller.resizeRequest = 0;
//     }

//     var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

//     scroller.endY = scrollY;
//     scroller.y += (scrollY - scroller.y) * scroller.ease;

//     if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
//         scroller.y = scrollY;
//         scroller.scrollRequest = 0;
//     }

//     TweenLite.set(scroller.target, {
//         y: -scroller.y,
//     });

//     requestId =
//         scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
// }

// function onScroll() {
//     scroller.scrollRequest++;
//     if (!requestId) {
//         requestId = requestAnimationFrame(updateScroller);
//     }
// }

// function onResize() {
//     scroller.resizeRequest++;
//     if (!requestId) {
//         requestId = requestAnimationFrame(updateScroller);
//     }
// }

// // Scroll to Section (Anchor links)
// var nav = $('.foody-nav-menu , .banner-btn'),
//     nav_height = nav.outerHeight();

// nav.find('a').on('click', function (e) {
//     e.preventDefault(); // Prevent the default anchor behavior

//     var $el = $(this),
//         id = $el.attr('href'),
//         targetOffset = $(id).offset().top - nav_height;

//     // Disable smooth scrolling during the anchor link scroll
//     isAnchorClick = true;

//     // Animate scroll to the target section
//     $('html, body').stop().animate(
//         {
//             scrollTop: targetOffset,
//         },
//         500,
//         function () {
//             // Re-enable smooth scrolling after animation completes
//             isAnchorClick = false;

//             // Trigger one scroll update to ensure the correct positioning
//             onScroll();
//         }
//     );
// });

// // Scroll to Top
// const scrolltotop = document.querySelector(".scrolltop");

// scrolltotop.addEventListener("click", () =>
//     gsap.to(window, {
//         scrollTo: 0,
//     })
// );
