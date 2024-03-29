import React, { Component } from 'react'

const pages = [
  {name: "Home", url: '/'},
  {name: "About", url: '/about'},
  {name: "Events", url: '/events'},
  {name: "Gallery", url: '/gallery'},
  {name: "Contact", url: '/contact'},
]

export default class Nav extends Component {
  componentDidMount() {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;

    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
  }

  componentWillUnmount() {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.removeEventListener('scroll', function() {
      const currentTop = document.body.getBoundingClientRect().top * -1;
      if ( currentTop < scrollPos) {
          // Scrolling Up
          if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
              mainNav.classList.add('is-visible');
          } else {
              mainNav.classList.remove('is-visible', 'is-fixed');
          }
      } else {
          // Scrolling Down
          mainNav.classList.remove(['is-visible']);
          if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
              mainNav.classList.add('is-fixed');
          }
      }
      scrollPos = currentTop;
  });
  }
  
  render() {
    return (
      <React.Fragment>
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
          <div className="container px-4 px-lg-5">
            <a className="navbar-brand" href="/">ART CLUB, HKUSU</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ms-auto py-4 py-lg-0">
                { pages.map(page => (
                  <li className="nav-item"><a className="nav-link px-lg-3 py-3 py-lg-4" href={`${page.url}`}>{page.name}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </React.Fragment>
    )
  }
}
