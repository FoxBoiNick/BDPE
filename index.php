<?php
    session_start();
    $User = false;
    $Message = "<p class=\"description\">To import songs please <a href=\"https://beatscore.eu/login\">Login</a> to your BeatSCORE account.</p>";
    if($_SERVER['SERVER_NAME'] != "localhost")
        {
            require("../source/global.php");

            $User = IsLoggedIn();

            if($User === false)
                $Message = '<p class="description">To import songs please <a href="https://beatscore.eu/login">Login</a> to your BeatSCORE account.</p>';
            else
                $Message = "<p class=\"description\">Logged into BeatSCORE as {$User}</p>";
        }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Primary Meta Tags -->
    <title>Beatstar Data Package Explorer</title>
    <meta name="title" content="Beatstar Data Package Explorer" />
    <meta name="description" content="BDPE is a tool to explore the contents of your Beatstar data package." />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://bdpe.beatscore.eu/" />
    <meta property="og:title" content="Beatstar Data Package Explorer" />
    <meta property="og:description" content="BDPE is a tool to explore the contents of your Beatstar data package." />
    <meta property="og:image" content="https://bdpe.beatscore.eu/img/logo.jpg" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://bdpe.beatscore.eu/" />
    <meta property="twitter:title" content="Beatstar Data Package Explorer" />
    <meta property="twitter:description" content="BDPE is a tool to explore the contents of your Beatstar data package." />
    <meta property="twitter:image" content="https://bdpe.beatscore.eu/img/logo.jpg" />

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Beatstar Data Package Explorer</title>

    <link rel="stylesheet" href="css/app.css">

    <!-- favicon -->
    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">

</head>
<body>
    <header class="header">
        <div class="icon noselect">
            <img src="img/logo.jpg" alt="icon" draggable="false" id="site-logo">
        </div>
        <h1 class="title noselect">Beatstar Data Package Explorer (OPEN BETA)</h1>
    </header>
    <div class="base">
        <div class="app-data" id="app-data">
            <div class="display">
                <div class="card user">
                    <div class="user-banner" id="userBanner">
                        <div class="banner-shade">
                            <div class="profile-img">
                                <img src="" alt="profile" id="userAvatar">
                            </div>
                            <div class="profile-info">
                                <div class="user-stars">
                                    <h1 class="name" id="userName"></h1><img src="./img/tourPass.webp" height="24px" width="24px" id="TourPassPin"></img>
                                </div>
                                <div class="user-stars">
                                    <img src="./img/star.webp" height="15px" width="15px"></img><p class="id" id="userStars"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab rounded center-page" tab_id="FullView">
                    <button class="tablinks" onclick="openView(event, 'FullOverview')" id="defaultOpenFullTab">Overview</button>
                    <button class="tablinks" onclick="openView(event, 'FullSongs')">Songs</button>
                    <?php if($User !== false) { ?>
                        <button class="tablinks" onclick="openView(event, 'FullPaymentHistory')">BeatSCORE Support?</button>
                      <?php } else { ?>
                        <button class="tablinks" onclick="openView(event, 'FullPaymentHistory')">More?</button>
                    <?php } ?>
                </div>
                <div class="tabcontent full griddata" id="FullOverview" for="FullView" display-type="grid">
                    <div class="card temp1">
                        <h1 class="card-title">Socials</h1>
                        <div class="card-stat">
                            <div class="stat">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                </svg>
                                <h3 class="card-stat-text">You started playing on <span class="stat-color" id="userStartDate">---</span></h3>
                            </div>
                            <small class="card-item-comment" id="userStartDateComment">---</small>
                        </div>
                        <div class="card-stat">
                            <div class="stat">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-phone-vibrate" viewBox="0 0 16 16">
                                    <path d="M10 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4zM6 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6z"/>
                                    <path d="M8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM1.599 4.058a.5.5 0 0 1 .208.676A6.967 6.967 0 0 0 1 8c0 1.18.292 2.292.807 3.266a.5.5 0 0 1-.884.468A7.968 7.968 0 0 1 0 8c0-1.347.334-2.619.923-3.734a.5.5 0 0 1 .676-.208zm12.802 0a.5.5 0 0 1 .676.208A7.967 7.967 0 0 1 16 8a7.967 7.967 0 0 1-.923 3.734.5.5 0 0 1-.884-.468A6.967 6.967 0 0 0 15 8c0-1.18-.292-2.292-.807-3.266a.5.5 0 0 1 .208-.676zM3.057 5.534a.5.5 0 0 1 .284.648A4.986 4.986 0 0 0 3 8c0 .642.12 1.255.34 1.818a.5.5 0 1 1-.93.364A5.986 5.986 0 0 1 2 8c0-.769.145-1.505.41-2.182a.5.5 0 0 1 .647-.284zm9.886 0a.5.5 0 0 1 .648.284C13.855 6.495 14 7.231 14 8c0 .769-.145 1.505-.41 2.182a.5.5 0 0 1-.93-.364C12.88 9.255 13 8.642 13 8c0-.642-.12-1.255-.34-1.818a.5.5 0 0 1 .283-.648z"/>
                                </svg>
                                <h3 class="card-stat-text">You've opened Beatstar <span class="stat-color" id="appOpenedTimes">---</span> times</h3>
                            </div>
                            <small class="card-item-comment" id="appOpenedTimesComment">---</small>
                        </div>
                        <div class="card-stat">
                            <div class="stat">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-hearts" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M11.5 1.246c.832-.855 2.913.642 0 2.566-2.913-1.924-.832-3.421 0-2.566ZM9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4Zm13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276ZM15 2.165c.555-.57 1.942.428 0 1.711-1.942-1.283-.555-2.281 0-1.71Z"/>
                                </svg>
                                <h3 class="card-stat-text">You have <span class="stat-color" id="userFriends">---</span> friends</h3>
                            </div>
                            <small class="card-item-comment" id="userFriendsComment">---</small>
                        </div>
                        <div class="card-stat">
                            <div class="stat">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-square-heart-fill" viewBox="0 0 16 16">
                                    <path d="M2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm6 3.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
                                </svg>
                                <h3 class="card-stat-text">You've bragged <span class="stat-color" id="userBrags">---</span> times</h3>
                            </div>
                            <small class="card-item-comment" id="userBragsComment">---</small>
                        </div>
                        <div class="card-stat">
                            <div class="stat">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-square-heart" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12ZM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z"/>
                                    <path d="M8 3.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
                                </svg>
                                <h3 class="card-stat-text">You've been bragged to <span class="stat-color" id="recievedBrags">---</span> times</h3>
                            </div>
                            <small class="card-item-comment" id="recievedBragsComment">---</small>
                        </div>
                    </div>
                    <div class="card temp2">
                        <h1 class="card-title">In-App Purchases</h1>
                        <div class="card-stat">
                            <div class="stat">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-stack" viewBox="0 0 16 16">
                                    <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                                    <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z"/>
                                </svg>
                                <h3 class="card-stat-text">You've spent <span class="stat-color" id="iapTotal">---</span> on Beatstar.</h3>
                            </div>
                            <small class="card-item-comment" id="iapTotalComment">---</small>
                        </div>
                        <div class="card-stat">
                            <div class="stat">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                    <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/>
                                </svg>
                                <h3 class="card-stat-text">Thats about <span class="stat-color" id="iapDailyAverage">---</span> for every day you've been playing.</h3>
                            </div>
                            <small class="card-item-comment" id="iapDailyAverageComment">---</small>
                        </div>
                        <h4 class="card-subtitle">Lets Take A Look At Your Last <span id="purchaseHistTotal">---</span> Purchases:</h4>
                        <div class="card-stat">
                            <div class="stat">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-percent" viewBox="0 0 16 16">
                                    <path d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0zM4.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm7 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                                </svg>
                                <h3 class="card-stat-text">These purchases make up <span class="stat-color" id="percentOfTotal">---</span> of your total spend.</h3>
                            </div>
                            <small class="card-item-comment" id="percentOfTotalComment">---</small>
                        </div>
                        <div class="card-stat">
                            <div class="stat">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-check" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                                </svg>
                                <h3 class="card-stat-text">Your favorite product is the <span class="stat-color" id="faveProduct">---</span></h3>
                            </div>
                            <small class="card-item-comment" id="faveProductComment">---</small>
                        </div>
                        <div id="pchart"></div>
                        <div id="frame"></div>
                    </div>
                    <div class="card temp3">
                        <h1 class="card-title">Gameplay</h1>
                        <div class="card-stat">
                            <div class="stat">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-collection-play" viewBox="0 0 16 16">
                                    <path d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1zm2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848l-4-2.5z"/>
                                    <path d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5h13z"/>
                                </svg>
                                <h3 class="card-stat-text">You have <span class="stat-color" id="songsUnlocked">---</span> songs unlocked.</h3>
                            </div>
                            <small class="card-item-comment" id="songsUnlockedComment">---</small>
                        </div>
                        <div class="card-stat">
                            <div class="stat">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-music-note-list" viewBox="0 0 16 16">
                                    <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
                                    <path fill-rule="evenodd" d="M12 3v10h-1V3h1z"/>
                                    <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
                                    <path fill-rule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
                                </svg>
                                <h3 class="card-stat-text">Your most played songs are <span class="stat-color" id="mostPlayed1">---</span> and <span class="stat-color" id="mostPlayed2">---</span>.</h3>
                            </div>
                            <small class="card-item-comment" id="mostPlayedCommand">---</small>
                        </div>
                        <h4 class="card-subtitle">Lets Take A Look At Your Averages:</h4>
                         <!-- Average Tabs -->
                        <div class="tab" tab_id="Averages">
                            <button class="tablinks" onclick="openView(event, 'Averages')" id="defaultOpenAvr">Averages</button>
                            <button class="tablinks" onclick="openView(event, 'TruAvr')">TruAvr™</button>
                        </div>
                        
                        <!-- Tab content -->
                        <div id="Averages" class="tabcontent" for="Averages">
                            <p>Your averages, as they are in game.</p>
                            <div class="averages-grid">
                                <div class="Normal" id="AverageNormal">---</div>
                                <div class="Hard" id="AverageHard">---</div>
                                <div class="Extreme" id="AverageExtreme">---</div>
                                <div class="Deluxe" id="AverageDeluxeNormal">---</div>
                                <div class="Deluxe" id="AverageDeluxeHard">---</div>
                                <div class="Deluxe" id="AverageDeluxeExtreme">---</div>
                            </div>
                        </div>
                        
                        <div id="TruAvr" class="tabcontent" for="Averages">
                            <p>Your true averages, based off every play you've ever done.</p>
                            <div class="averages-grid">
                                <div class="Normal" id="TruAverageNormal">---</div>
                                <div class="Hard" id="TruAverageHard">---</div>
                                <div class="Extreme" id="TruAverageExtreme">---</div>
                                <div class="Deluxe" id="TruAverageDeluxeNormal">---</div>
                                <div class="Deluxe" id="TruAverageDeluxeHard">---</div>
                                <div class="Deluxe" id="TruAverageDeluxeExtreme">---</div>
                            </div>
                        </div>
                        <h4 class="card-subtitle">And your medal collection:</h4>
                        <div id="mpie"></div>
                    </div>
                </div>
                <div class="tabcontent full griddata" id="FullSongs" for="FullView" display-type="grid">
                    <div class="card songsearch">
                        <div class="song-searchbar">
                            <!-- [LEFT] SEARCHBAR [LEFT] [RIGHT] FILTER, ORDER [RIGHT]-->
                            <div class="searchbar">
                                <div class="input-container">
                                    <icon>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                        </svg>
                                    </icon>
                                    <input type="text" id="songsearch" class="searchbar-input">
                                </div>
                            </div>
                            <div class="filterbar">
                                <!-- 
                                    <div class="custom-select" style="width:200px;">
                                        <select>
                                            <option value="Filter" li-color="rgba(0,0,0,0.3)">All Songs</option>
                                            <option value="Normal" li-color="#00ff00">Normal</option>
                                            <option value="Hard" li-color="#ff0000">Hard</option>
                                            <option value="Extreme" li-color="#0000ff">Extreme</option>
                                        </select>
                                    </div>
                                    <a href="#" class="filterbar-button" id="filterbar-button">Filter</a>
                                -->
                                <div class="filterbar-button noselect">
                                    <div class="filterbutton" id="filterbutton">
                                        <icon>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                                                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
                                            </svg>
                                        </icon>
                                        <p class="noselect">Filter</p>
                                    </div>
                                    <div class="filterbar-dropdown" id="songfilterbar-dropdown">
                                        <p class="noselect">Apply Filters</p>
                                        <div class="filterbar-dropdown-item">
                                            <p class="noselect item-title">Type</p>
                                            <div class="item-content">
                                                <div class="item-content-item">
                                                    <label style="--selected-color: 51, 98, 104;">Standard</label>
                                                </div>
                                                <div class="item-content-item">
                                                    <label style="--selected-color: 233, 112, 26;">Deluxe</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="filterbar-dropdown-item">
                                            <p class="noselect item-title">Difficulty</p>
                                            <div class="item-content">
                                                <div class="item-content-item">
                                                    <label style="--selected-color: 51, 98, 104;">Normal</label>
                                                </div>
                                                <div class="item-content-item">
                                                    <label style="--selected-color: 239, 126, 21;">Hard</label>
                                                </div>
                                                <div class="item-content-item">
                                                    <label style="--selected-color: 218, 17, 37;">Extreme</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="filterbar-dropdown-item">
                                            <p class="noselect item-title">Genres</p>
                                            <div class="item-content">
                                                <div class="item-content-item">
                                                    <label style="--selected-color: 36, 98, 209;">Hip-Hop</label>
                                                </div>
                                                <div class="item-content-item">
                                                    <label style="--selected-color: 200, 63, 117">Pop</label>
                                                </div>
                                                <div class="item-content-item">
                                                    <label style="--selected-color: 1, 154, 195">R&B</label>
                                                </div>
                                                <div class="item-content-item">
                                                    <label style="--selected-color: 196, 40, 41">Rock</label>
                                                </div>
                                                <div class="item-content-item">
                                                    <label style="--selected-color: 138, 53, 200">Dance</label>
                                                </div>
                                                <div class="item-content-item">
                                                    <label style="--selected-color: 217, 98, 42">Alternative</label>
                                                </div>
                                                <div class="item-content-item">
                                                    <label style="--selected-color: 133, 83, 50">Country</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a href="#" class="filterbar-order" id="filterbar-order">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-up" viewBox="0 0 16 16">
                                        <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div class="search-results" id="song-search-results">
                            <div class="search-item">
                                <div class="song-image">
                                    <img src="./img/logo.jpg" alt="Song Image">
                                </div>
                                <div class="song-info">
                                    <p class="song-name">Loading...</p>
                                    <p class="song-author">Loading...</p>
                                </div>
                                <div class="song-score">
                                    <div class="song-stars"></div>
                                    <p class="song-medal"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card songdisplay">
                        <p class="owo-whats-this">Soon™</p>
                    </div>
                </div>
                <div class="tabcontent full griddata" id="FullPaymentHistory" for="FullView" display-type="grid">
                    <p class="owo-whats-this">Soon™</p>
                </div>
            </div>
        </div>
        <div class="container" id="app-input">
            <input type="file" id="upload" accept=".zip" style="display: none;">
                <div class="app-input">
                    <p class="description"><a href="https://github.com/FoxBoiNick/BDPE">BDPE</a> is a tool to explore the contents of your Beatstar data package. It is your device that is doing all the work, so no data is sent to any server!<br>If you want to support me, you can do so by <a class="donate-href" href="https://www.buymeacoffee.com/beatbot">donating</a>.</p>
                    <p class="step1-button-container" draggable="false" id="HelpModalActivator">
                        <a class="step1 noselect" draggable="false">
                            <small class="tag noselect">1</small>
                            Get your Beatstar data package. 📦
                            <br>
                            (click here for help)
                        </a>
                    </p>
                    <div class="beta-warning" id="BetaWarn">
                        <x onclick="this.parentElement.style.display='none'; window.localStorage.setItem('betaWarn', 'true');">X</x>
                        <h1>Open Beta</h1>
                        <p>BDPE is currently in open beta. This means that there may be bugs and missing features.
                            <br>If you find any bugs or have any suggestions, please join the <a href="https://discord.gg/jAbuWshfG3">Discord server</a> and report them.
                            <br>If you want to support me, you can do so by <a class="donate-href" href="https://www.buymeacoffee.com/beatbot">donating</a>.</p>
                    </div>
                    <div class="step2-button-container" draggable="false" id="upload-file">
                        <label for="upload" class="step2" draggable="false">
                            <small class="tag noselect">2</small>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-arrow-up" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
                                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                            </svg>
                            <span class="noselect" id="upload-info">
                                Click <strong>here</strong> or <strong>drag and drop</strong> your data package here.
                        </label>
                    </div>
                    <!-- Demo -->
                    <div class="demo-link">
                        <p class="noselect">No data package? <a class="demo noselect" id="demoPackage">Demo</a></p>
                    </div>
                </div>
            </div>
            <div class="footer">
                <p class="noselect">Created with <span class="heart">❤</span> by <a href="https://bio.link/furry">Nick</a>. BDPE is an <a href="https://github.com/FoxBoiNick/BDPE">open source</a> project.</p>
                <p class="noselect">Inspired by the Discord Data Package Explorer.</p>
            </div>

            <div id="helpModal" class="modal">

                <!-- Help Modal -->
                <div class="modal-content">
                    <div class="modal-header">
                        <span id="HelpModalCloser" class="close">&times;</span>
                        <h2>Guide: How to Request a Data Package from Beatstar</h2>
                    </div>
                    <div class="modal-body">
                        <div class="modal-warn">
                            <p>Please refrain from abusing GDPR request forms as in accordance with GDPR laws Space Ape has legal justification to deny repeated requests.
                                <br> We would recommend waiting at least 30 days between requests.</p>
                            </p>
                        </div>
                        <hr>
                        <h2 class="noselect">Step 1: Open the Support Portal</h2>
                        <p class="noselect">Open the Beatstar game on your device and follow these steps:</p>
                        <ol>
                            <li class="noselect">Tap on the burger icon (three lines), usually found in the top-left corner of the screen.</li>
                            <li class="noselect">Select "Support" from the menu.</li>
                            <li class="noselect">Choose "Open Portal" or "Open Inbox" to access the support platform.</li>
                            <li class="noselect">Tap on "Get In Touch" to start a new support ticket.</li>
                        </ol>

                        <hr>
                        
                        <h2 class="noselect">Step 2: Request the Data Package</h2>
                        <p class="noselect">Compose a message to request the data package. Here's an example message:</p>
                        <pre id="copyRequestMessage">
Subject: Request for Data Package

Hi Beatstar Support,
I would like to request an export of all data that you have collected and stored about me in the game "Beatstar".
Kindly provide me with a data package containing this information.</pre>
                        <button class="noselect btn-copy" id="copyRequestMessageButton" onclick="copyRequestMessage()">Copy Message</button>
                    
                        <hr>

                        <h2 class="noselect">Step 3: Verify Account Ownership</h2>
                        <p class="noselect">After you send the message, Beatstar support will get back to you to confirm your request and ask for some in-game information to verify that you are the account owner.</p>
                        <p class="noselect">Reply to the support team with the requested information, which may include:</p>
                        <ul>
                            <li class="noselect">Your Journey Rank</li>
                            <li class="noselect">Your current amount of Gems</li>
                            <li class="noselect">Your current amount of Stars</li>
                            <li class="noselect">The most recent Event you've played</li>
                            <li class="noselect">The most recent Song you've played</li>
                            <li class="noselect">The most recent Song you unlocked</li>
                            <li class="noselect">Your current unlocked Song count</li>
                            <li class="noselect">A few friends on your friends list</li>
                        </ul>

                        <hr>
                        
                        <h2 class="noselect">Step 4: Wait for the Data Package</h2>
                        <p class="noselect">Once you've provided the necessary information, Beatstar support will process your request. They will send the data package to you ASAP, usually within 1-3 business days.</p>

                        <hr>
                    </div>
                </div>
            </div>
            <div id="debugModal" class="modal">

                <!-- Debug Modal -->
                <div class="modal-content">
                    <div class="modal-header">
                        <span id="DebugModalCloser" class="close">&times;</span>
                        <h2>BDPE Debug/Error Menu</h2>
                    </div>
                    <div class="modal-body" id="debugModalText">
                        
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</body>
<footer>
    <script src="js/tabber.js"></script>
    <script src="js/app.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/frappe-charts@1.6.1/dist/frappe-charts.min.umd.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/frappe-charts@1.2.4/dist/frappe-charts.min.iife.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/fflate@0.8.0/umd/index.js"></script>
    <script id='selfDestruct' src="js/loader.js"></script>
</footer>
</html>