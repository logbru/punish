const React = require('react')
const Html = require('./layouts/default.jsx')


const Home = props => {
  return (
    <Html>
      <div className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="col-sm-6 mx-auto">
          <div className="row">
            <div className="col-4">
              <img src="./assets/images/logo_white.svg" alt="Puni.sh" className="punish" />
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className="col-8">
              <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="/">Boosting <span className="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/faq">FAQ</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/contact">Contact Us</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/about">About</a>
                  </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                  <button type="button" className="btn btn-warning" id="members">Members</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h2 className='text-muted mt-5 mb-5'>
              Punish Boosting Services
            </h2>
          </div>
          <div className="col-sm-6">
            <div className="card border-secondary mt-4 price float-right">
              <div className="card-body">
                <h4 className="card-title"><span className="text-muted">Current Price: </span><span id="curPrice" className="text-success">€0</span></h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div id="smartwizard">
              <ul>
                <li><a href="#account">Select Account<br /><small>Search for your LoL account</small></a></li>
                <li><a href="#types">Boost Types<br /><small>Select boost type</small></a></li>
                <li><a href="#options">Boost Options<br /><small>Select boost options</small></a></li>
                <li><a href="#overview">Overview<br /><small>Submit your order</small></a></li>
              </ul>

              <div>
                <div id="account" className="">
                  <div className="container">
                    <div className="row">
                      <div className="col-sm-4">
                        <form>
                          <div className="form-group">
                            <label htmlFor="searchUsername">Username</label>
                            <input type="text" className="form-control" id="searchUsername" placeholder="Enter username" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="searchServer">Server</label>
                            <select multiple="" className="form-control" id="searchServer">
                              <option value="br">Brazil (BR)</option>
                              <option value="eune">Europe (EUNE)</option>
                              <option value="euw" selected>Europe West (EUW)</option>
                              <option value="jp">Japan (JP)</option>
                              <option value="kr">Korea (kr)</option>
                              <option value="lan">Latin America North (LAN)</option>
                              <option value="las">Latin America South (LAS)</option>
                              <option value="na">North America (NA)</option>
                              <option value="oce">Oceania (OCE)</option>
                              <option value="ru">Russia (RU)</option>
                              <option value="tr">Turkey (TR)</option>
                            </select>
                          </div>
                          <button className="btn btn-primary float-right" id="searchBtn">Search</button>
                        </form>
                      </div>
                      <div className="col-sm-1"></div>
                      <div className="col-sm-7">
                        {/* Loading spinner */}
                        <div className="spin"></div>

                        <div className="accountRender ml-3">
                          <div className="row">
                            <div className="col-sm-4">
                              <img src="" alt="Profile Icon" id="profileIcon" className="img-thumbnail thumb" />
                              <h4 id="profileName" className="text-muted ml-2"></h4>
                              <h6 id="profileLevel" className="text-muted ml-2"></h6>
                            </div>
                            <div className="col-sm-8">
                              <table className="table table-hover">
                                <thead>
                                  <tr>
                                    <th scope="col">Queue</th>
                                    <th scope="col">Tier</th>
                                    <th scope="col">Division</th>
                                  </tr>
                                </thead>
                                <tbody id="profileTable">

                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="types" className="">
                  <div className="container">
                    <div className="row">
                      <div className="col-12">
                        <div id="noAccount" className="text-center">
                          <img src="./assets/images/noaccount.png" alt="" />
                        </div>
                      </div>
                      <div className="col-12">
                        <div id="hasAccount">
                          <fieldset>
                            <div className="row">
                              <div className="col-sm-6 text-center">
                                <h4 className="text-muted">Solo Queue Options</h4>
                                <hr></hr>
                                <div className="form-group">
                                  <div id="solo1">
                                    <button type="button" id="soloBoost1" className="btn btn-primary nextstep mt-2">Division Boost</button>
                                  </div>
                                  <div id="solo2">
                                    <button type="button" id="soloBoost2" className="btn btn-primary nextstep mt-2">Duo Games or Wins</button>
                                  </div>
                                  <div id="solo3">
                                    <button type="button" id="soloBoost3" className="btn btn-primary nextstep mt-2">Placement Games</button>
                                  </div>
                                  <div id="solo4">
                                    <button type="button" id="soloBoost4" className="btn btn-primary nextstep mt-2">Ranked Wins</button>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6 text-center">
                                <h4 className="text-muted">Flex Queue Options</h4>
                                <hr></hr>
                                <div className="form-group">
                                  <div id="flex1">
                                    <button type="button" id="flexBoost1" className="btn btn-primary nextstep mt-2">Division Boost</button>
                                  </div>
                                  <div id="flex2">
                                    <button type="button" id="flexBoost2" className="btn btn-primary nextstep mt-2">Duo Games or Wins</button>
                                  </div>
                                  <div id="flex3">
                                    <button type="button" id="flexBoost3" className="btn btn-primary nextstep mt-2">Placement Games</button>
                                  </div>
                                  <div id="flex4">
                                    <button type="button" id="flexBoost4" className="btn btn-primary nextstep mt-2">Ranked Wins</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="options" className="">
                  <div id="notype" className="text-center">
                    <img src="./assets/images/noboost.png" alt="" />
                  </div>
                  <div id="b1" className="option">
                    {/* division boost */}
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label for="desiredTier">Desired Tier</label>
                            <select className="form-control" id="desiredTier">

                            </select>
                            <label for="desiredDivision" id="divLabel">Desired Division</label>
                            <select className="form-control" id="desiredDivision">

                            </select>
                          </div>
                        </div>
                        <div className="col-sm-3"></div>
                      </div>
                    </div>
                  </div>
                  <div id="b2" className="option">
                    {/* Duo games */}
                    <div className="container">
                      <div className="row mt-5 mb-5">
                        <div className="col-sm-4">
                          <fieldset>
                            <div className="form-group">
                              <div className="custom-control custom-radio">
                                <input type="radio" id="gamesOnly" name="customRadio" className="custom-control-input" checked />
                                <label className="custom-control-label" for="gamesOnly">Games Only</label>
                              </div>
                              <div className="custom-control custom-radio">
                                <input type="radio" id="winsOnly" name="customRadio" className="custom-control-input" />
                                <label className="custom-control-label" for="winsOnly">Wins</label>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                        <div className="col-sm-8">
                          <fieldset className="form-group">
                            <div className="row">
                              <div className="col-sm-6">
                                <label for="gamesRange">Number of Games</label>
                              </div>
                              <div className="col-sm-6">
                                <label for="gamesRange"><span className="badge badge-pill badge-success"><h4 id="gameCount">  1  </h4></span></label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-6">
                                <input type="range" className="custom-range" min="1" max="10" value="1" id="gamesRange" />
                              </div>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="b3" className="option">
                    {/* Placement Games */}
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label htmlFor="previousSeason">Previous Season Tier</label>
                            <select multiple="" className="form-control" id="previousSeason">
                              <option value="Iron">Iron</option>
                              <option value="Bronze">Bronze</option>
                              <option value="Silver">Silver</option>
                              <option value="Gold">Gold</option>
                              <option value="Platinum">Platinum</option>
                              <option value="Diamond">Diamond</option>
                              <option value="Master">Master</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-8">
                          <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-3">
                              <label for="placementRange">Number of Games</label>
                            </div>
                            <div className="col-sm-3">
                              <label for="placementRange"><span className="badge badge-pill badge-success"><h4 id="placementCount">  1  </h4></span></label>
                            </div>
                            <div className="col-sm-3"></div>
                          </div>
                          <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                              <input type="range" className="custom-range" min="1" max="10" value="1" id="placementRange" />
                            </div>
                            <div className="col-sm-3"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="b4" className="option">
                    {/* Ranked wins */}
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-3">
                          <label for="winRange">Number of Wins</label>
                        </div>
                        <div className="col-sm-3">
                          <label for="winRange"><span className="badge badge-pill badge-success"><h4 id="winCount">  1  </h4></span></label>
                        </div>
                        <div className="col-sm-3"></div>
                      </div>
                      <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6">
                          <input type="range" className="custom-range" min="1" max="10" value="1" id="winRange" />
                        </div>
                        <div className="col-sm-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="overview" className="">
                  {/* Order overview */}
                  <div className="container">
                    <div className="row">
                      <div className="col-12">
                        <div id="nooverview" className="text-center">
                          <img src="./assets/images/noboost.png" alt="" />
                        </div>
                      </div>
                      <div className="col-12">
                        <div id="hasoverview" className="option">
                          <div className="row">
                            <div className="col-sm-4">
                              <h4 className="text-muted mb-2">Add-Ons</h4>
                              <hr></hr>
                              <fieldset>
                                <div class="form-group">
                                  <div class="custom-control custom-switch">
                                    <input type="checkbox" class="custom-control-input" id="customChampions" checked="" />
                                    <label class="custom-control-label" for="customChampions">Toggle this switch element</label>
                                  </div>
                                </div>
                              </fieldset>
                            </div>
                            <div className="col-sm-4">
                              <h4 className="text-muted mb-2">Overview</h4>
                              <hr></hr>
                            </div>
                            <div className="col-sm-4">
                              <button type="button" className="btn btn-success" id="boostMe">Boost Me</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card border-primary mb-3 mt-3 champ-card" id="championCard">
              <div className="card-header">Custom Champions and Roles</div>
              <div className="card-body">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <h4 className="text-muted">Roles</h4>
                      <hr></hr>
                      <div className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-2">
                          <div class="card">
                            <div class="card-body">
                              <h5 class="card-title text-muted">Mid Lane</h5>
                              <div className="row text-center">
                                <div className="col-12">
                                  <img src="./assets/images/mid.png" alt="Mid Lane" className="img-thumbnail role-icon" />
                                  <fieldset>
                                    <div class="form-group mt-3">
                                      <div class="custom-control custom-switch">
                                        <input type="checkbox" class="custom-control-input" id="midlane" checked="" />
                                        <label class="custom-control-label" for="midlane"></label>
                                      </div>
                                    </div>
                                  </fieldset>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <div class="card">
                            <div class="card-body">
                              <h5 class="card-title text-muted">Top Lane</h5>
                              <div className="row text-center">
                                <div className="col-12">
                                  <img src="./assets/images/top.png" alt="Mid Lane" className="img-thumbnail role-icon" />
                                  <fieldset>
                                    <div class="form-group mt-3">
                                      <div class="custom-control custom-switch">
                                        <input type="checkbox" class="custom-control-input" id="toplane" checked="" />
                                        <label class="custom-control-label" for="toplane"></label>
                                      </div>
                                    </div>
                                  </fieldset>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <div class="card">
                            <div class="card-body">
                              <h5 class="card-title text-muted">Marksman</h5>
                              <div className="row text-center">
                                <div className="col-12">
                                  <img src="./assets/images/marksman.png" alt="marksman" className="img-thumbnail role-icon" />
                                  <fieldset>
                                    <div class="form-group mt-3">
                                      <div class="custom-control custom-switch">
                                        <input type="checkbox" class="custom-control-input" id="marksman" checked="" />
                                        <label class="custom-control-label" for="marksman"></label>
                                      </div>
                                    </div>
                                  </fieldset>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <div class="card">
                            <div class="card-body">
                              <h5 class="card-title text-muted">Jungle</h5>
                              <div className="row text-center">
                                <div className="col-12">
                                  <img src="./assets/images/jungle.png" alt="jungle" className="img-thumbnail role-icon" />
                                  <fieldset>
                                    <div class="form-group mt-3">
                                      <div class="custom-control custom-switch">
                                        <input type="checkbox" class="custom-control-input" id="jungle" checked="" />
                                        <label class="custom-control-label" for="jungle"></label>
                                      </div>
                                    </div>
                                  </fieldset>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <div class="card">
                            <div class="card-body">
                              <h5 class="card-title text-muted">Support</h5>
                              <div className="row text-center">
                                <div className="col-12">
                                  <img src="./assets/images/support.png" alt="support" className="img-thumbnail role-icon" />
                                  <fieldset>
                                    <div class="form-group mt-3">
                                      <div class="custom-control custom-switch">
                                        <input type="checkbox" class="custom-control-input" id="support" checked="" />
                                        <label class="custom-control-label" for="support"></label>
                                      </div>
                                    </div>
                                  </fieldset>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <hr></hr>
                      <h4 className="text-muted">Champions</h4>
                      <hr></hr>
                      <div className="row">
                        <div className="col-4">
                          <form>
                            <div className="form-group">
                              <label htmlFor="champSearch" className="text-muted">Search champions</label>
                              <input type="text" className="form-control" id="champSearch" placeholder="Enter champion name" />
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="row" id="championStream">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12"><div className="spacer"></div></div>
        </div>
      </div>
    </Html >
  )
}

module.exports = Home
