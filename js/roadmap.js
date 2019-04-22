var selectedItem,
    itemTL,
    overlayTL,
    scrollTL,
    isExpanded = false;
var timeline = document.querySelector(".timeline");
var items = document.querySelectorAll(".timeline-item");
var itemImages = document.querySelectorAll(".timeline-item > .timeline-photo");
var itemHeadlines = document.querySelectorAll(".timeline-item > .timeline-headline");
var overlay = document.querySelector(".timeline-overlay");
var backButton = document.querySelector(".timeline-back");
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  var _loop = function _loop() {
    item = _step.value;
    var randomId = Math.random().toString(36).replace(/[^a-z]+/g, "").substr(2, 10);
    item.setAttribute("data-timeline", randomId);
    item.addEventListener("click", function (e) {
      handleItemClick(randomId);
    });
    item.addEventListener("mouseover", function (e) {
      if (!isExpanded && e.target.tagName === "IMG") {
        e.target.parentNode.children.length > 1 && TweenMax.fromTo(e.target.parentNode.children[1], 1, {
          opacity: 0,
          scaleX: 0.5,
          scaleY: 0.1,
          y: -70
        }, {
          opacity: 1,
          scaleX: 1,
          scaleY: 1,
          y: -5,
          ease: Back.easeOut
        });
        TweenMax.to(e.target, 30, {
          scale: 2
        });
        TweenMax.to(e.target.parentNode, 4, {
          boxShadow: "0 30px 70px rgba(0,0,0,.45)"
        });
      }
    });
    item.addEventListener("mouseout", function (e) {
      if (!isExpanded && e.target.tagName === "IMG") {
        e.target.parentNode.children.length > 1 && TweenMax.to(e.target.parentNode.children[1], 1, {
          opacity: 0,
          scaleX: 1,
          scaleY: 1,
          y: 100
        });
        TweenMax.to(e.target, 1, {
          scale: 1
        });
        TweenMax.to(e.target.parentNode, 1, {
          boxShadow: "0 10px 30px rgba(0,0,0,.2)"
        });
      }
    });
  };

  for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    _loop();
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return != null) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

function handleItemClick(id) {
  if (overlayTL !== undefined) {
    overlayTL.progress(0);
    overlayTL.pause();
  }

  if (!isExpanded) {
    isExpanded = true;

    var _item = document.querySelector("[data-timeline=".concat(id, "]"));

    var itemHeadline = _item.querySelector(".timeline-headline");

    var itemSubTitle = _item.querySelector(".timeline-subtitle");

    var itemContent = _item.querySelector(".timeline-content");

    var itemPhoto = _item.querySelector(".timeline-photo");

    var itemCTA = _item.querySelector(".timeline-cta");

    var itemExcerpt = _item.querySelector(".timeline-excerpt");

    var itemChildContents = document.querySelectorAll("[data-timeline=".concat(id, "] .timeline-content > *"));
    var itemPhotoImg = itemPhoto.querySelector("img");
    var unSelectedItems = document.querySelectorAll("[data-timeline]:not([data-timeline=".concat(id, "])"));
    var unSelectedChildItems = document.querySelectorAll("[data-timeline]:not([data-timeline=".concat(id, "]) > *:not(.timeline-photo)"));
    var itemOffsetTop = _item.getBoundingClientRect().y * -1;
    selectedItem = _item;
    TweenMax.to(itemPhotoImg, 1, {
      scale: 1
    });
    TweenMax.to(itemCTA, .5, {
      opacity: 0
    });
    TweenMax.to(itemPhoto, 1, {
      boxShadow: "0 10px 30px rgba(0,0,0, .2)"
    });
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        _i = _step2.value;

        _i.classList.remove("is-active");
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    timeline.classList.add("is-expanded");

    _item.classList.add("is-active");

    backButton.classList.add("is-active");
    itemTL = new TimelineMax({
      paused: false
    });
    itemTL.set(timeline, {
      maxWidth: 760
    }).set(items, {
      clearProps: "all"
    }).set(itemSubTitle, {
      clearProps: "all"
    }).set(itemPhoto, {
      clearProps: "all"
    }).set(itemHeadline, {
      clearProps: "all"
    }).to(unSelectedChildItems, 0.3, {
      y: 40,
      opacity: 0
    }).to(itemHeadline, 0.5, {
      opacity: 0,
      left: 0,
      top: "30vh",
      width: "100%",
      textAlign: "center"
    }, "-=.35").set(itemExcerpt, {
      display: "none"
    }).to(unSelectedItems, 0.2, {
      opacity: 0
    }, "-=.35").add("itemExpand").to(timeline, 0.5, {
      maxWidth: "100%"
    }, "itemExpand").to(_item, 0.8, {
      y: itemOffsetTop,
      width: "100%",
      height: "60vh"
    }, "itemExpand").to(itemHeadline, 1, {
      top: 0,
      height: "100vh",
      padding: 0
    }, "-=.3").to(itemPhoto, 1, {
      borderRadius: 0,
      height: "100vh"
    }, "itemExpand").add("resize").to(itemHeadline, 1, {
      height: 100,
      opacity: 1,
      fontSize: "calc(.4vw + 10px)",
      backgroundColor: "rgba(45, 45, 45, 0.8)"
    }, "resize").to(itemPhoto, 1, {
      height: 100
    }, "resize").set(itemPhoto, {
      height: 100,
      position: "fixed",
      top: 0
    }).set(itemHeadline, {
      position: "fixed",
      top: 0
    }).set(_item, {
      y: 0,
      height: "auto",
      marginTop: 0,
      clearProps: "transform"
    }).set(unSelectedItems, {
      display: "none"
    }).set(timeline, {
      paddingBottom: 0
    }).set(itemContent, {
      display: "block",
      top: 100
    }).set(window, {
      scrollTo: {
        y: 0
      }
    }).fromTo(itemContent, 0.4, {
      opacity: 0,
      y: 70
    }, {
      opacity: 1,
      y: 0
    }).staggerFromTo(itemChildContents, 0.7, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0
    }, 0.1, "-=.3");
  }
}

backButton.addEventListener("click", function () {
  if (isExpanded) {
    timeline.classList.remove("is-expanded");
    selectedItem.classList.remove("is-active");
    backButton.classList.remove("is-active");
    overlayTL = new TimelineMax({
      paused: false,
      onComplete: function onComplete() {
        itemTL.progress(0);
        itemTL.pause();
        TweenMax.staggerFromTo(items, 0.9, {
          opacity: 0,
          y: 30
        }, {
          opacity: 1,
          y: 0
        }, 0.04, function () {
          isExpanded = false;
        });
        TweenMax.set(itemHeadlines, {
          clearProps: "all"
        });
      }
    });
    overlayTL.to(selectedItem, 0.3, {
      opacity: 0
    }).to(overlay, 0.6, {
      height: "110vh",
      ease: Expo.easeOut
    }, "+=.2").to(overlay, 0.6, {
      height: 0,
      top: "100%",
      ease: Expo.easeOut
    });
  }
});
