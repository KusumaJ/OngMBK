/* Generated from data/site.json by scripts/build-site.js. */
(function () {
  'use strict';

  var SITE = {
  "site": {
    "name": "ONG MBK TU79 EBA18",
    "footer": "Migrated from Weebly by your favorite sis",
    "authorName": "Kusuma",
    "authorUrl": "https://linkedin.com/in/kusumaj/",
    "sourceUrl": "https://github.com/KusumaJ/OngMBK"
  },
  "navigation": [
    {
      "label": "Home",
      "href": "index.html"
    },
    {
      "label": "M.4",
      "children": [
        {
          "label": "M.4/1",
          "href": "m41.html"
        },
        {
          "label": "M.4/2",
          "href": "m42.html"
        }
      ]
    },
    {
      "label": "M.5",
      "children": [
        {
          "label": "M.5/1",
          "href": "m51.html"
        },
        {
          "label": "M.5/2",
          "href": "m52.html"
        }
      ]
    },
    {
      "label": "M.6",
      "children": [
        {
          "label": "M.6/1",
          "href": "m61.html"
        },
        {
          "label": "M.6/2",
          "href": "m62.html"
        }
      ]
    },
    {
      "label": "Freshmen",
      "children": [
        {
          "label": "Freshmen Fall",
          "href": "freshmen-fall.html"
        },
        {
          "label": "Freshmen Spring",
          "href": "freshmen-spring.html"
        }
      ]
    },
    {
      "label": "Sophomore",
      "children": [
        {
          "label": "Sophomore Fall",
          "href": "sophomore-fall.html"
        },
        {
          "label": "Sophomore Spring",
          "href": "sophomore-spring.html"
        },
        {
          "label": "Sophomore Summer",
          "href": "sophomore-summer.html"
        }
      ]
    },
    {
      "label": "Junior/Senior",
      "children": [
        {
          "label": "Compulsory Courses",
          "href": "compulsory-courses.html"
        },
        {
          "label": "Economic Theory",
          "href": "economic-theory.html"
        },
        {
          "label": "Quantitative Economics",
          "href": "quantitative-economics.html"
        },
        {
          "label": "Applied Economics",
          "href": "applied-economics.html"
        }
      ]
    },
    {
      "label": "Work/Life",
      "href": "worklife.html"
    },
    {
      "label": "Contact",
      "href": "contact.html"
    }
  ]
};
  var NAVIGATION = SITE.navigation;

  function currentPage() {
    var match = window.location.pathname.match(/\/([^/]+\.html)$/i);
    return match ? match[1].toLowerCase() : 'index.html';
  }

  function containsCurrent(item, page) {
    return item.href === page || (item.children || []).some(function (child) { return child.href === page; });
  }

  function renderItem(item, page) {
    var active = containsCurrent(item, page) ? ' id="active"' : '';
    var hasChildren = item.children && item.children.length;
    var link = hasChildren
      ? '<a class="wsite-menu-item" href="#" aria-expanded="false">' + item.label + '</a>'
      : '<a class="wsite-menu-item" href="' + item.href + '">' + item.label + '</a>';
    var children = '';

    if (hasChildren) {
      children = '<div class="wsite-menu-wrap" style="display:none"><ul class="wsite-menu">' + item.children.map(function (child) {
        return '<li class="wsite-menu-subitem-wrap' + (child.href === page ? ' wsite-nav-current' : '') + '"><a class="wsite-menu-subitem" href="' + child.href + '"><span class="wsite-menu-title">' + child.label + '</span></a></li>';
      }).join('') + '</ul></div>';
    }

    return '<li class="wsite-menu-item-wrap"' + active + '>' + link + children + '</li>';
  }

  function renderNavigation() {
    var page = currentPage();
    return '<ul class="wsite-menu-default">' + NAVIGATION.map(function (item) {
      return renderItem(item, page);
    }).join('') + '</ul>';
  }

  function renderMobileNavigation() {
    var page = currentPage();
    var items = NAVIGATION.map(function (item) {
      if (!item.children) {
        return '<a class="site-mobile-link' + (item.href === page ? ' is-current' : '') + '" href="' + item.href + '">' + item.label + '</a>';
      }

      return '<details class="site-mobile-group' + (containsCurrent(item, page) ? ' is-current' : '') + '"><summary>' + item.label + '</summary><div class="site-mobile-submenu">' + item.children.map(function (child) {
        return '<a class="site-mobile-link' + (child.href === page ? ' is-current' : '') + '" href="' + child.href + '">' + child.label + '</a>';
      }).join('') + '</div></details>';
    }).join('');

    return '<aside class="navmobile-wrapper site-mobile-menu" aria-label="Site navigation"><div class="site-mobile-panel"><div class="site-mobile-heading">Menu<button type="button" class="site-mobile-close" data-menu-close aria-label="Close navigation">×</button></div><nav>' + items + '</nav></div></aside>';
  }

  function renderHeader() {
    return '<div id="header"><div class="nav-trigger hamburger" data-menu-toggle role="button" tabindex="0" aria-label="Open navigation" aria-expanded="false"><div class="open-btn"><span class="mobile"></span><span class="mobile"></span><span class="mobile"></span></div></div><div id="sitename"><span class="wsite-logo"><a href="index.html"><span id="wsite-title">' + SITE.site.name + '</span></a></span></div></div>';
  }

  function renderFooter() {
    return '<div id="footer"><div id="footer-content">' + SITE.site.footer + ' <a href="' + SITE.site.authorUrl + '" target="_blank" rel="noopener noreferrer">' + SITE.site.authorName + '</a> · <a href="' + SITE.site.sourceUrl + '" target="_blank" rel="noopener noreferrer">Source</a></div></div>';
  }

  function replace(selector, markup) {
    var target = document.querySelector(selector);
    if (target) target.outerHTML = markup;
  }

  function initMobileNavigation() {
    document.addEventListener('click', function (event) {
      var trigger = event.target.closest('[data-menu-toggle]');
      var close = event.target.closest('[data-menu-close]');
      if (!trigger && !close) return;
      event.preventDefault();
      var open = close ? false : !document.body.classList.contains('menu-open');
      document.body.classList.toggle('menu-open', open);
      var toggle = document.querySelector('[data-menu-toggle]');
      if (toggle) toggle.setAttribute('aria-expanded', String(open));
    }, true);
  }

  replace('[data-site-header]', renderHeader());
  replace('[data-site-navigation]', '<div id="navigation">' + renderNavigation() + '</div>');
  replace('[data-site-footer]', renderFooter());
  replace('[data-site-mobile-nav]', renderMobileNavigation());
  initMobileNavigation();
}());
