var processedData = {
    "Profile": {
        "startDate": "",
        "userName": "",
        "userAvatar": "",
        "userBanner": "",
        "userStars": 0,
        "appOpenedTimes": 0,
    },
    "friendsOverview": {
        "userFriends": 0,
        "userBrags": 0,
        "recievedBrags": 0,
    },
    "iapOverview": {
        "totalSpent": 0,
        "iapTotalPerDay": 0,
        "purchaseHistTotal": 0,
        "PurchaseHist": {
            "percentOfTotal": 0,
            "amountOfTotal": 0,
            "mostPurchasedItem": {
                "Name": "",
                "ProductId": "",
                "Amount": 0,
            },
            "categories": {
                "Unique": 0,
                "Tour Pass": 0,
                "Evnt Tkns": 0,
                "Gem Pack": 0,
                "Unlmtd Play": 0,
                "Dx Cards": 0,
            }
        }
    },
    "GameplayOverview": {
        "songsUnlocked": 0,
        "mostPlayedSong": {
            "1": {
                "Name": "",
                "PlayedCount": 0,
            },
            "2": {
                "Name": "",
                "PlayedCount": 0,
            }
        },
        "Averages": {
            "gameAverage": {
                "Normal": {
                    "Standard": 0,
                    "Deluxe": 0,
                },
                "Hard": {
                    "Standard": 0,
                    "Deluxe": 0,
                },
                "Extreme": {
                    "Standard": 0,
                    "Deluxe": 0,
                },
            },
            "TruAvr": {
                "Normal": {
                    "Standard": 0,
                    "Deluxe": 0,
                },
                "Hard": {
                    "Standard": 0,
                    "Deluxe": 0,
                },
                "Extreme": {
                    "Standard": 0,
                    "Deluxe": 0,
                },
            }
        },
        "Medals": {
            "g": 0,
            "p": 0,
            "d": 0,
            "dp": 0,
            "nm": 0,
        }
    },
}

var products = {
    // Common Products
    "bundle-tourpass[0-9]+-premium": {
        "Name": "Tour Pass",
        "Category": "Tour Pass",
    },
    "bundle-tourpass-premium": {
        "Name": "Tour Pass",
        "Category": "Tour Pass",
    },
    "bundle-event-token-[0-9]+": {
        "Name": "Event Token Pack",
        "Category": "Evnt Tkns",
    },
    "shop-leaderboard-event-[0-9]+": {
        "Name": "Event Token Pack",
        "Category": "Evnt Tkns",
    },
    "currency-pack-1": {
        "Name": "$1.99 Gem Pack",
        "Category": "Gem Packs",
    },
    "currency-pack-1-199": {
        "Name": "$1.99 Gem Pack",
        "Category": "Gem Packs",
    },
    "currency-pack-2": {
        "Name": "$4.99 Gem Pack",
        "Category": "Gem Packs",
    },
    "currency-pack-3": {
        "Name": "$9.99 Gem Pack",
        "Category": "Gem Packs",
    },
    "currency-pack-4": {
        "Name": "$19.99 Gem Pack",
        "Category": "Gem Packs",
    },
    "currency-pack-5": {
        "Name": "$49.99 Gem Pack",
        "Category": "Gem Packs",
    },
    "currency-pack-6": {
        "Name": "$99.99 Gem Pack",
        "Category": "Gem Packs",
    },
    "bundle-backstagepass-[0-9]+-[0-9]+days-[0-9]+dia": {
        "Name": "Unlimited Play Pass",
        "Category": "Unlmtd Play",
    },

    // Less Common Products
    "liveops-bundle-170-liveops-bundle-launchDeluxe-150-cards": {
        "Name": "Deluxe Card Pack",
        "Category": "Dx Cards",
    },
    "liveops-bundle-[0-9]+-liveops-bundle-Deluxe-[0-9]+-cards": {
        "Name": "Deluxe Card Pack",
        "Category": "Dx Cards",
    },

    // Unique/One-Off Products
    "liveops-bundle-137-bundle-nightVisions": {
        "Name": "Night Visions Bundle",
        "Category": "Unique",
    },

    // UNAMED PRODUCTS -- NEED TO BE NAMED
    "bundle-liveops-v14-week2-gb-2": {
        "Name": "Country Bundles",
        "Category": "Unique",
    },
    "bundle-liveops-v15a-week1-all": {
        "Name": "Country Bundles",
        "Category": "Unique",
    },
    "bundle-liveops-v14d-week4-all": {
        "Name": "Country Bundles",
        "Category": "Unique",
    },
    "bundle-liveops-v14-week3-all-2": {
        "Name": "Country Bundles",
        "Category": "Unique",
    },
    "bundle-liveops-v16a-bundleJP": {
        "Name": "JP Country Bundle",
        "Category": "Unique",
    },
    "bundle-liveops-v16a-bundleBR-gb-2": {
        "Name": "GB Country Bundle",
        "Category": "Unique",
    },
    "bundle-liveops-v17b-bundleJP": {
        "Name": "JP Country Bundle",
        "Category": "Unique",
    },

    // FALLBACK PRODUCT -- FOR WHEN A PRODUCT IS NOT IN BDPE
    "fallback": {
        "Name": "DM Nick because a majority of your purchases are not in BDPE yet.",
        "Category": "Unique",
    }

}

async function processData(files) {
    
    const getFile = (name) => files.find((file) => file.name === name);

    const readFile = async (name) => {
        return new Promise((resolve) => {
            const file = getFile(name);
            if (!file) {
                resolve(null);
            }
            const fileContents = [];
            const decoder = new fflate.DecodeUTF8();
            file.ondata = (err, data, final) => {
                decoder.push(data, final);
            }
            decoder.ondata = (str, final) => {
                fileContents.push(str);
                if (final) {
                    resolve(fileContents.join(''));
                }
            };
            file.start();
        });
    };


    // load profile.json
    const profileJson = JSON.parse(await readFile('profile.json'));
    const friendsJson = JSON.parse(await readFile('friends.json'));
    const paymentStatsJson = JSON.parse(await readFile('payment_stats.json'));
    const paymentHistoryJson = JSON.parse(await readFile('payment_history.json'));

    // calculate Averages.gameAverage
    const deluxeSongs = {
        "Normal": [],
        "Hard": [],
        "Extreme": [],
    }
    const standardSongs = {
        "Normal": [],
        "Hard": [],
        "Extreme": [],
    }
    medalThresholds = {
        "Standard": {
            "Normal": {
                "No Medal": 0,
                "Gold": 48500,
                "Platinum": 49000,
                "Diamond": 49500,
                "Diamond Perfect": 50000,
            },
            "Hard": {
                "No Medal": 0,
                "Gold": 72750,
                "Platinum": 73500,
                "Diamond": 74250,
                "Diamond Perfect": 75000,
            },
            "Extreme": {
                "No Medal": 0,
                "Gold": 97000,
                "Platinum": 98000,
                "Diamond": 99000,
                "Diamond Perfect": 100000,
            }
        },
        "Deluxe": {
            "Normal": {
                "No Medal": 0,
                "Gold": 48900,
                "Platinum": 49300,
                "Diamond": 49750,
                "Diamond Perfect": 50000,
            },
            "Hard": {
                "No Medal": 0,
                "Gold": 73350,
                "Platinum": 73950,
                "Diamond": 74625,
                "Diamond Perfect": 75000,
            },
            "Extreme": {
                "No Medal": 0,
                "Gold": 97800,
                "Platinum": 98600,
                "Diamond": 99500,
                "Diamond Perfect": 100000,
            }
        }
    }


    for (song of profileJson.beatmaps.beatmaps) {
        songInfo = songData[song.templateId];
        if (songInfo === undefined) {
            console.log("Song not found in BDPE: " + song.templateId);
            continue;
        }
        if (songInfo.Difficulty === "Normal") {
            if (songInfo.Type === "Standard") {
                standardSongs.Normal.push(song);
                
                // SET MEDAL
                if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Normal["Diamond Perfect"]) {
                    processedData.GameplayOverview.Medals.dp++;
                }
                else if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Normal["Diamond"]) {
                    processedData.GameplayOverview.Medals.d++;
                }
                else if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Normal["Platinum"]) {
                    processedData.GameplayOverview.Medals.p++;
                }
                else if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Normal["Gold"]) {
                    processedData.GameplayOverview.Medals.g++;
                }
                else {
                    processedData.GameplayOverview.Medals.nm++;
                }

            } else if (songInfo.Type === "Deluxe") {
                deluxeSongs.Normal.push(song);

                // SET MEDAL
                if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Normal["Diamond Perfect"]) {
                    processedData.GameplayOverview.Medals.dp++;
                }
                else if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Normal["Diamond"]) {
                    processedData.GameplayOverview.Medals.d++;
                }
                else if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Normal["Platinum"]) {
                    processedData.GameplayOverview.Medals.p++;
                }
                else if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Normal["Gold"]) {
                    processedData.GameplayOverview.Medals.g++;
                }
                else {
                    processedData.GameplayOverview.Medals.nm++;
                }

            }
        } else if (songInfo.Difficulty === "Hard") {
            if (songInfo.Type === "Standard") {
                standardSongs.Hard.push(song);

                // SET MEDAL
                if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Hard["Diamond Perfect"]) {
                    processedData.GameplayOverview.Medals.dp++;
                }
                else if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Hard["Diamond"]) {
                    processedData.GameplayOverview.Medals.d++;
                }
                else if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Hard["Platinum"]) {
                    processedData.GameplayOverview.Medals.p++;
                }
                else if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Hard["Gold"]) {
                    processedData.GameplayOverview.Medals.g++;
                }
                else {
                    processedData.GameplayOverview.Medals.nm++;
                }

            } else if (songInfo.Type === "Deluxe") {
                deluxeSongs.Hard.push(song);
                
                // SET MEDAL
                if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Hard["Diamond Perfect"]) {
                    processedData.GameplayOverview.Medals.dp++;
                }
                else if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Hard["Diamond"]) {
                    processedData.GameplayOverview.Medals.d++;
                }
                else if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Hard["Platinum"]) {
                    processedData.GameplayOverview.Medals.p++;
                }
                else if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Hard["Gold"]) {
                    processedData.GameplayOverview.Medals.g++;
                }
                else {
                    processedData.GameplayOverview.Medals.nm++;
                }

            }
        } else if (songInfo.Difficulty === "Extreme") {
            if (songInfo.Type === "Standard") {
                standardSongs.Extreme.push(song);

                // SET MEDAL
                if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Extreme["Diamond Perfect"]) {
                    processedData.GameplayOverview.Medals.dp++;
                }
                else if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Extreme["Diamond"]) {
                    processedData.GameplayOverview.Medals.d++;
                }
                else if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Extreme["Platinum"]) {
                    processedData.GameplayOverview.Medals.p++;
                }
                else if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Extreme["Gold"]) {
                    processedData.GameplayOverview.Medals.g++;
                }
                else {
                    processedData.GameplayOverview.Medals.nm++;
                }

            } else if (songInfo.Type === "Deluxe") {
                deluxeSongs.Extreme.push(song);

                // SET MEDAL
                if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Extreme["Diamond Perfect"]) {
                    processedData.GameplayOverview.Medals.dp++;
                }
                else if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Extreme["Diamond"]) {
                    processedData.GameplayOverview.Medals.d++;
                }
                else if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Extreme["Platinum"]) {
                    processedData.GameplayOverview.Medals.p++;
                }
                else if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Extreme["Gold"]) {
                    processedData.GameplayOverview.Medals.g++;
                }
                else {
                    processedData.GameplayOverview.Medals.nm++;
                }

            }
        }
    }

    let dataavrs = {
        "gameAverage": {
            "Normal": {
                "Standard": 0,
                "Deluxe": 0,
            },
            "Hard": {
                "Standard": 0,
                "Deluxe": 0,
            },
            "Extreme": {
                "Standard": 0,
                "Deluxe": 0,
            },
        },
        "TruAvr": {
            "Normal": {
                "Standard": 0,
                "Deluxe": 0,
            },
            "Hard": {
                "Standard": 0,
                "Deluxe": 0,
            },
            "Extreme": {
                "Standard": 0,
                "Deluxe": 0,
            },
        }
    }

    for (song of standardSongs.Normal) {
        dataavrs.gameAverage.Normal.Standard += song.HighestScore.absoluteScore;
        dataavrs.TruAvr.Normal.Standard += song.AbsoluteLifetimeScore / song.PlayedCount;
    }
    dataavrs.gameAverage.Normal.Standard /= standardSongs.Normal.length;
    dataavrs.TruAvr.Normal.Standard /= standardSongs.Normal.length;

    for (song of standardSongs.Hard) {
        dataavrs.gameAverage.Hard.Standard += song.HighestScore.absoluteScore;
        dataavrs.TruAvr.Hard.Standard += song.AbsoluteLifetimeScore / song.PlayedCount;
    }
    dataavrs.gameAverage.Hard.Standard /= standardSongs.Hard.length;
    dataavrs.TruAvr.Hard.Standard /= standardSongs.Hard.length;

    for (song of standardSongs.Extreme) {
        dataavrs.gameAverage.Extreme.Standard += song.HighestScore.absoluteScore;
        dataavrs.TruAvr.Extreme.Standard += song.AbsoluteLifetimeScore / song.PlayedCount;
    }
    dataavrs.gameAverage.Extreme.Standard /= standardSongs.Extreme.length;
    dataavrs.TruAvr.Extreme.Standard /= standardSongs.Extreme.length;

    for (song of deluxeSongs.Normal) {
        dataavrs.gameAverage.Normal.Deluxe += song.HighestScore.absoluteScore;
        dataavrs.TruAvr.Normal.Deluxe += song.AbsoluteLifetimeScore / song.PlayedCount;
    }
    dataavrs.gameAverage.Normal.Deluxe /= deluxeSongs.Normal.length;
    dataavrs.TruAvr.Normal.Deluxe /= deluxeSongs.Normal.length;

    for (song of deluxeSongs.Hard) {
        dataavrs.gameAverage.Hard.Deluxe += song.HighestScore.absoluteScore;
        dataavrs.TruAvr.Hard.Deluxe += song.AbsoluteLifetimeScore / song.PlayedCount;
    }
    dataavrs.gameAverage.Hard.Deluxe /= deluxeSongs.Hard.length;
    dataavrs.TruAvr.Hard.Deluxe /= deluxeSongs.Hard.length;

    for (song of deluxeSongs.Extreme) {
        dataavrs.gameAverage.Extreme.Deluxe += song.HighestScore.absoluteScore;
        dataavrs.TruAvr.Extreme.Deluxe += song.AbsoluteLifetimeScore / song.PlayedCount;
    }
    dataavrs.gameAverage.Extreme.Deluxe /= deluxeSongs.Extreme.length;
    dataavrs.TruAvr.Extreme.Deluxe /= deluxeSongs.Extreme.length;

    processedData.GameplayOverview.Averages = dataavrs;



    // Profile.startDate
    processedData.Profile.startDate = profileJson.sharplaData.creationTime;

    // Profile.userName
    processedData.Profile.userName = profileJson.name + "#" + profileJson.nameUid;

    // Profile.userAvatar
    processedData.Profile.userAvatar = profileJson.basicInfo.profileIconId;

    // Profile.userBanner
    processedData.Profile.userBanner = `https://beatbot.beatscore.eu/assets/banner?banner=BB${
        encodeURI(profileJson.playerVisuals.callingCard.templateId)
    }&user_name=${
        encodeURI(profileJson.name)
    }&user_avatar=${
        //encodeURI(processedData.Profile.userAvatar)
        "https://via.placeholder.com/128x128.png"
    }&level=20&src=True`;

    // Profile.userStars
    processedData.Profile.userStars = profileJson.currencies.find((currency) => currency.currencyId === 7).amount;

    // friendsOverview.userFriends
    processedData.friendsOverview.userFriends = friendsJson.length;

    // friendsOverview.userBrags
    processedData.friendsOverview.userBrags = 0;
    // loop through beatmaps.beatmaps and add the length of beatmap.BragState.braggedToPlayers
    for (beatmap of profileJson.beatmaps.beatmaps) {
        processedData.friendsOverview.userBrags += beatmap.BragState.braggedToPlayers.length;
    }

    // friendsOverview.recievedBrags
    processedData.friendsOverview.recievedBrags = profileJson.friendBrags.Brags.length;

    // Profile.appOpenedTimes
    processedData.Profile.appOpenedTimes = profileJson.sharplaData.sessionCount;

    // iapOverview.totalSpent
    processedData.iapOverview.totalSpent = paymentStatsJson.iapSpend

    // iapOverview.iapTotalPerDay 
    let startDate = new Date(processedData.Profile.startDate);
    let daysPlayed = Math.round((Date.now() - startDate) / (1000 * 60 * 60 * 24));
    processedData.iapOverview.iapTotalPerDay = paymentStatsJson.iapSpend / daysPlayed;

    // iapOverview.purchaseHistTotal
    processedData.iapOverview.purchaseHistTotal = 0;
    for (purchase of paymentHistoryJson) {
        if ("receiptKey" in purchase) {
            processedData.iapOverview.purchaseHistTotal++;
        }
    }

    // iapOverview.PurchaseHist.percentOfTotal
    // iterate through paymentHistoryJson and add up the total spent
    let totalSpent = 0;
    for (purchase of paymentHistoryJson) {
        if ("receiptKey" in purchase) {
            totalSpent += purchase.purchase.usdTierPrice;
        }        
    }

    processedData.iapOverview.PurchaseHist.percentOfTotal = (totalSpent / processedData.iapOverview.totalSpent) * 100;

    // iapOverview.PurchaseHist.amountOfTotal
    processedData.iapOverview.PurchaseHist.amountOfTotal = totalSpent;
    
    // iapOverview.PurchaseHist.mostPurchasedItem
    let temp = {
        "Name": "",
        "ProductID": "",
        "Amount": 0,
    }

    // print unique productIds
    let items = [];
    for (purchase of paymentHistoryJson) {
        items.push(purchase.purchase.productId);
    }
    //console.log([...new Set(items)]);

    // iterate through paymentHistoryJson and find the most purchased item
    items = [];
    unreadableitems = [];
    fallback = [];
    readable = [];
    categories = {
        "Unique": 0,
        "Tour Pass": 0,
        "Evnt Tkns": 0,
        "Gem Pack": 0,
        "Unlmtd Play": 0,
        "Dx Cards": 0,
    }
    for (purchase of paymentHistoryJson) {
        let unreadable = purchase.purchase.productId
        unreadableitems.push(unreadable);
        let matched = false;
        for (product in products) {
            // if the product matches the regex (key) in products
            if (new RegExp(product).test(unreadable)) {
                // add the value of the key to items
                items.push(products[product].Name);
                // add the value of the key to categories
                categories[products[product].Category]++;
                readable.push(unreadable);
                matched = true;
                break;
            }
        }
        if (!matched) {
            items.push(products["fallback"].Name);
            fallback.push(unreadable);
        }
    }
    temp.Name = items.sort((a, b) =>
        items.filter(v => v === a).length - items.filter(v => v === b).length
).pop();
    temp.ProductID = unreadableitems.sort((a, b) =>
        unreadableitems.filter(v => v === a).length - unreadableitems.filter(v => v === b).length
).pop();
    temp.Amount = items.filter(x => x === temp.Name).length;
    processedData.iapOverview.PurchaseHist.mostPurchasedItem = temp;
    processedData.iapOverview.PurchaseHist.categories = categories;

    // gameplayOverview.songsUnlocked
    processedData.GameplayOverview.songsUnlocked = profileJson.beatmaps.beatmaps.length;

    // gameplayOverview.mostPlayedSong.1 and 2
    let mostPlayedSong = {
        "1": {
            "Name": "",
            "PlayedCount": 0,
        },
        "2": {
            "Name": "",
            "PlayedCount": 0,
        }
    }
    // iterate through beatmaps.beatmaps and find the most played song using  "PlayedCount" as a filter
    filter = profileJson.beatmaps.beatmaps.filter(beatmap => beatmap.PlayedCount > 0);
    if (songData[filter.sort((a, b) => b.PlayedCount - a.PlayedCount)[0].templateId]) {
        // if the song is found, add it to mostPlayedSong
        mostPlayedSong[1].Name = songData[filter.sort((a, b) => b.PlayedCount - a.PlayedCount)[0].templateId].Name;
        mostPlayedSong[1].PlayedCount = filter.sort((a, b) => b.PlayedCount - a.PlayedCount)[0].PlayedCount;
    } else {
        // if the song is not found, add the templateId to mostPlayedSong
        mostPlayedSong[1].Name = beatmap.templateId;
        mostPlayedSong[1].PlayedCount = filter.sort((a, b) => b.PlayedCount - a.PlayedCount)[0].PlayedCount;
    }
    // repeat for mostPlayedSong[2]
    if (songData[filter.sort((a, b) => b.PlayedCount - a.PlayedCount)[1].templateId]) {
        // if the song is found, add it to mostPlayedSong
        mostPlayedSong[2].Name = songData[filter.sort((a, b) => b.PlayedCount - a.PlayedCount)[1].templateId].Name;
        mostPlayedSong[2].PlayedCount = filter.sort((a, b) => b.PlayedCount - a.PlayedCount)[1].PlayedCount;
    } else {
        // if the song is not found, add the templateId to mostPlayedSong
        mostPlayedSong[2].Name = beatmap.templateId;
        mostPlayedSong[2].PlayedCount = filter.sort((a, b) => b.PlayedCount - a.PlayedCount)[1].PlayedCount;
    }
    // convert templateId to readable name using songData

    processedData.GameplayOverview.mostPlayedSong = mostPlayedSong;

    // print data
    console.log(processedData);
    // update display
    await updateDisplay(processedData);
}

async function updateDisplay(processedData) {
    // update user start date
    let humanReadableDate = new Date(processedData.Profile.startDate);
    document.getElementById("userStartDate").innerHTML = humanReadableDate.toLocaleDateString("en-US");
    document.getElementById("userStartDateComment").innerHTML = Math.floor((Date.now() - humanReadableDate) / 31536000000) + " years ago" + " (" + humanReadableDate.toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }) + ")";
    // update user name
    document.getElementById("userName").innerHTML = processedData.Profile.userName;
    // update user avatar
    document.getElementById("userAvatar").src = "./img/profiles/" + processedData.Profile.userAvatar + ".jpg";
    // update user banner
    document.getElementById("userBanner").style.backgroundImage = `url(${processedData.Profile.userBanner})`;
    // update user stars
    document.getElementById("userStars").innerHTML = processedData.Profile.userStars;

    // update user friends
    let friendscomments = {
        "0": "Well this is awkward...",
        "1": "Time to get bragging!",
        "10": "You have a few friends!",
        "25": "You know a lot of people!",
        "50": "You're popular!",
        "75": "You're very popular!",
        "100": "I don't want to see your brags list!",
        "250": "Are you cheating?",
        "500": "You're definitely cheating!",
        "1000": "cheater...",
        "5000": "how... just how?",
    }
    comment = ""
    // get the highest key that is lower or equal to the user's friends
    for (const key in friendscomments) {
        if (processedData.friendsOverview.userFriends >= key) {
            if (key in (friendscomments)) {
                comment = friendscomments[key];
            }
        }
    }
    document.getElementById("userFriends").innerHTML = processedData.friendsOverview.userFriends;
    document.getElementById("userFriendsComment").innerHTML = comment;

    // update user brags
    let bragsComments = {
        "0": "You haven't bragged to anyone!",
        "1": "You've bragged to someone!",
        "10": "You've bragged to a few people!",
        "25": "You've bragged to a lot of people!",
        "50": "You're on a roll!",
        "75": "Wow, thats a lot of brags!",
        "100": "You're a bragging machine!",
        "250": "You're unstoppable!",
        "500": "You're a bragging god!",
        "1000": "Oh, so you're that guy...",
        "5000": "I think you have a problem...",
    }
    comment = ""
    // get the highest key that is lower or equal to the user's brags
    for (const key in bragsComments) {
        if (processedData.friendsOverview.userBrags >= key) {
            if (key in (bragsComments)) {
                comment = bragsComments[key];
            }
        }
    }
    document.getElementById("userBrags").innerHTML = processedData.friendsOverview.userBrags;
    document.getElementById("userBragsComment").innerHTML = comment;

    // update user recieved brags
    let recievedBragsComments = {
        "0": "You haven't recieved any brags!",
        "1": "You've recieved a brag!",
        "10": "You've recieved a few brags!",
        "25": "You've recieved a lot of brags!",
        "50": "You're popular!",
        "75": "You're very popular!",
        "100": "Your friends love you!",
        "250": "You're a brag magnet!",
        "500": "I hope you beat all these!",
        "1000": "Oh, you have that guy as a friend...",
        "5000": "Ah, you might need some help...",
    }
    comment = ""
    // get the highest key that is lower or equal to the user's recieved brags
    for (const key in recievedBragsComments) {
        if (processedData.friendsOverview.recievedBrags >= key) {
            if (key in (recievedBragsComments)) {
                comment = recievedBragsComments[key];
            }
        }
    }
    document.getElementById("recievedBrags").innerHTML = processedData.friendsOverview.recievedBrags;
    document.getElementById("recievedBragsComment").innerHTML = comment;

    // update user app opened times
    document.getElementById("appOpenedTimes").innerHTML = processedData.Profile.appOpenedTimes;
    let timesADay = processedData.Profile.appOpenedTimes / ((Date.now() - processedData.Profile.startDate) / 86400000);
    // if timesADay is exact number or decimal is below 0.2
    if (timesADay % 1 == 0 || timesADay % 1 < 0.2) {
        document.getElementById("appOpenedTimesComment").innerHTML = "That's " + Math.round(timesADay) + " times a day!";
    } else {
        document.getElementById("appOpenedTimesComment").innerHTML = "That's ~" + Math.floor(timesADay) + " to " + Math.ceil(timesADay) + " times a day!";
    }

    // update iap total
    iapTotalComments = {
        "0": "no pay is your way to play!",
        "1": "removing the ads I see...",
        "10": "Saw a season pass you liked?",
        "25": "Still not much, but you are buying!",
        "50": "a few purchases here and there...",
        "75": "You're buying a lot of stuff!",
        "100": "You're a big spender!",
        "250": "You are a... \"Passionate Expendee\"",
        "500": "You're a whale!",
        "700": "You're a big whale!",
        "1000": "Okay, you have a problem...",
        "1500": "What are you doing with your life?",
        "5000": "I don't even want to know...",
    }
    comment = ""
    // get the highest key that is lower or equal to the user's iap total
    for (const key in iapTotalComments) {
        if (processedData.iapOverview.totalSpent >= key) {
            if (key in (iapTotalComments)) {
                comment = iapTotalComments[key];
            }
        }
    }
    // round to 2 decimal places
    document.getElementById("iapTotal").innerHTML = "$" + processedData.iapOverview.totalSpent.toFixed(2) + " USD";
    document.getElementById("iapTotalComment").innerHTML = comment;

    // iap daily average
    iapDailyAverageComments = {
        "0": "a whole lot of nothing",
        "0.5": "a Chocolate Bar",
        "1": "a Bag of Sweets",
        "2": "a Cup of Coffee",
        "5": "a Big Mac",
        "10": "a Movie Ticket",
        "25": "a Meal at a Restaurant",
        "50": "a New Game",
        "75": "a Coffee Maker",
        "100": "a Mechanical Gaming Keyboard",
        "250": "a Robot Vacuum Cleaner",
        "500": "an Apple Watch",
        "1000": "an air Hockey Table",
    }

    document.getElementById("iapDailyAverage").innerHTML = "$" + processedData.iapOverview.iapTotalPerDay.toFixed(2) + " USD";
    comment = ""
    // get the highest key that is lower or equal to the user's iap daily average
    for (const key in iapDailyAverageComments) {
        if (processedData.iapOverview.iapTotalPerDay >= key) {
            if (key in (iapDailyAverageComments)) {
                comment = iapDailyAverageComments[key];
            }
        }
    }
    document.getElementById("iapDailyAverageComment").innerHTML = "Gifting Space Ape " + comment + " every day!";


    // update purchase history total
    document.getElementById("purchaseHistTotal").innerHTML = processedData.iapOverview.purchaseHistTotal

    // percentage of purchases that are last 100    
    document.getElementById("percentOfTotal").innerHTML = processedData.iapOverview.PurchaseHist.percentOfTotal.toFixed(2) + "%";
    document.getElementById("percentOfTotalComment").innerHTML = "(rounded to 2 decimal places)";

    // fave product
    document.getElementById("faveProduct").innerHTML = processedData.iapOverview.PurchaseHist.mostPurchasedItem.Name;

    let chartValues = [
        processedData.iapOverview.PurchaseHist.categories["Tour Pass"],
        processedData.iapOverview.PurchaseHist.categories["Evnt Tkns"],
        processedData.iapOverview.PurchaseHist.categories["Gem Pack"],
        processedData.iapOverview.PurchaseHist.categories["Unlmtd Play"],
        processedData.iapOverview.PurchaseHist.categories["Dx Cards"],
        processedData.iapOverview.PurchaseHist.categories["Unique"]
    ]
    let data= {
        labels: [
          "Tour Pass",
          "Evnt Tkns",
          "Gem Pack",
          "Unlmtd Play",
          "Dx Cards",
          "Unique",
        ],
    
        datasets: [
          {
            name: "Counts",
            chartType: "percentage",
            values: chartValues,
          }
        ]
      }
    let spendingchart = new frappe.Chart("#pchart", {
        title: "Spending By Category",
        // or DOM element
        data: data,
        type: "percentage", // or 'bar', 'line', 'pie', 'percentage'
        height: 160,
        truncateLegends: true,
        colors: ["#410B13", "#CD5D67", "#BA1F33", "#421820", "#91171F", "#e01e37"],
    });

    // songs unlocked
    document.getElementById("songsUnlocked").innerHTML = processedData.GameplayOverview.songsUnlocked;

    // get total song count from api GET
    // https://beatbot.beatscore.eu/api/count/songs
    // ["count"]
    let totalSongs = await fetch("https://beatbot.beatscore.eu/api/count/songs")
        .then(response => response.json())
        .then(data => {
            return data["count"];
        })

    document.getElementById("songsUnlockedComment").innerHTML = "That's " + Math.round((processedData.GameplayOverview.songsUnlocked / totalSongs) * 100) + "% of all songs!";

    document.getElementById("mostPlayed1").innerHTML = processedData.GameplayOverview.mostPlayedSong[1].Name;
    document.getElementById("mostPlayed2").innerHTML = processedData.GameplayOverview.mostPlayedSong[2].Name;
    document.getElementById("mostPlayedCommand").innerHTML = "With a total of " + (processedData.GameplayOverview.mostPlayedSong[1].PlayedCount) + " and " + (processedData.GameplayOverview.mostPlayedSong[2].PlayedCount) + " plays respectively!";

    // update averages
    // game average
    document.getElementById("AverageNormal").innerHTML = Math.round(processedData.GameplayOverview.Averages.gameAverage.Normal.Standard);
    document.getElementById("AverageHard").innerHTML = Math.round(processedData.GameplayOverview.Averages.gameAverage.Hard.Standard);
    document.getElementById("AverageExtreme").innerHTML = Math.round(processedData.GameplayOverview.Averages.gameAverage.Extreme.Standard);
    document.getElementById("AverageDeluxeNormal").innerHTML = Math.round(processedData.GameplayOverview.Averages.gameAverage.Normal.Deluxe);
    document.getElementById("AverageDeluxeHard").innerHTML = Math.round(processedData.GameplayOverview.Averages.gameAverage.Hard.Deluxe);
    document.getElementById("AverageDeluxeExtreme").innerHTML = Math.round(processedData.GameplayOverview.Averages.gameAverage.Extreme.Deluxe);

    // tru average
    document.getElementById("TruAverageNormal").innerHTML = Math.round(processedData.GameplayOverview.Averages.TruAvr.Normal.Standard);
    document.getElementById("TruAverageHard").innerHTML = Math.round(processedData.GameplayOverview.Averages.TruAvr.Hard.Standard);
    document.getElementById("TruAverageExtreme").innerHTML = Math.round(processedData.GameplayOverview.Averages.TruAvr.Extreme.Standard);
    document.getElementById("TruAverageDeluxeNormal").innerHTML = Math.round(processedData.GameplayOverview.Averages.TruAvr.Normal.Deluxe);
    document.getElementById("TruAverageDeluxeHard").innerHTML = Math.round(processedData.GameplayOverview.Averages.TruAvr.Hard.Deluxe);
    document.getElementById("TruAverageDeluxeExtreme").innerHTML = Math.round(processedData.GameplayOverview.Averages.TruAvr.Extreme.Deluxe);

    let mpievalues = [
        processedData.GameplayOverview.Medals.dp,
        processedData.GameplayOverview.Medals.d,
        processedData.GameplayOverview.Medals.p,
        processedData.GameplayOverview.Medals.g,
        processedData.GameplayOverview.Medals.nm
    ]
    let mpiedata= {
        labels: [
            "Dia Perfect",
            "Diamond",
            "Platinum",
            "Gold",
            "No Medal",
        ],
    
        datasets: [
          {
            name: "Counts",
            chartType: "pie",
            values: mpievalues,
          }
        ]
      }
    let medalPie = new frappe.Chart("#mpie", {
        title: "Medal Distribution",
        // or DOM element
        data: mpiedata,
        type: "pie", // or 'bar', 'line', 'pie', 'percentage'
        height: 300,
        truncateLegends: true,
        colors: ["#410B13", "#CD5D67", "#BA1F33", "#421820", "#91171F", "#e01e37"],
    });


    // SHOW DISPLAY
    let display =  document.getElementById("app-data")
    let input = document.getElementById("app-input")
    // add class 
    display.classList.add("active");
    input.classList.add("inactive");

    setTimeout(function(){ window.dispatchEvent(new Event('resize')); }, 100);
    setTimeout(function(){ window.dispatchEvent(new Event('resize')); }, 500);
};


// get element with id 'upload-file'
var uploadFile = document.getElementById('upload-file');
var uploadInfo = document.getElementById('upload-info');

async function checkPackage(files) {
    let validPackage = true;
    const requiredFiles = [
        'readme.txt',
        'profile.json',
        'payment_stats.json',
        'payment_history.json',
    ]
    for (const requiredFile of requiredFiles) {
        if (!files.some((file) => file.name === requiredFile)) validPackage = false;
    }
    return validPackage;
};

// handle file
async function handleFile(evt=null) {
    // get file object
    if (evt != null) {
        var filesz = evt.target.files || evt.dataTransfer.files;
    } else {
        var filesz = document.getElementById('upload').files;
    }

    file = filesz[0];

    const uz = new fflate.Unzip();
    uz.register(fflate.AsyncUnzipInflate);
    const files = [];
    uz.onfile = (f) => files.push(f);
    if (!file.stream) {
        loading = false;
        uploadInfo.innerHTML = "<p style='color:red;'>This browser does not support streaming uploads, try using google chrome instead.</p>";
        return;
    }
    const reader = file.stream().getReader();
    while (true) {
        const { value, done } = await reader.read();
        if (done) {
            uz.push(new Uint8Array(0), true);
            break;
        }
        for (let i = 0; i < value.length; i += 65536) {
            uz.push(value.subarray(i, i + 65536), false);
        }
    }
    
    // check if package is valid
    const validPackage = await checkPackage(files);

    if (!validPackage) {
        uploadInfo.innerHTML = "<p style='color:red;'>Your package seems to be corrupted. Click or drop your package file here to retry</p>";
        return;
    }

    uploadInfo.innerHTML = "<p style='color:green;'>Your package is valid! Loading Awesomeness...</p>";

    // process data
    await processData(files);
    
};

// handle file select event
uploadFile.addEventListener('click', async function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    // open file select dialog
    document.getElementById('upload').click();
}, false);
// on upload input change
document.getElementById('upload').addEventListener('change', async function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    handleFile(evt);
}, false);

// handle drag over event
uploadFile.addEventListener('dragover', async function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    evt.dataTransfer.dropEffect = 'copy';
    uploadInfo.innerHTML = "<strong>Drop</strong> your data package here to begin processing";

    // apply css class 'dragover' to element with id 'upload-file'
    uploadFile.classList.add('dragover');
}, false);

// handle drag leave event
uploadFile.addEventListener('dragleave', async function handleDragLeave(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    uploadInfo.innerHTML = "Click <strong>here</strong> or <strong>drag and drop</strong> your data package here.";

    // remove css class 'dragover' from element with id 'upload-file'
    uploadFile.classList.remove('dragover');
}, false);

// handle file drop event
uploadFile.addEventListener('drop', async function handleFileDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    // remove css class 'dragover' from element with id 'upload-file'
    uploadFile.classList.remove('dragover');

    // get file object
    var files = evt.target.files || evt.dataTransfer.files;
    // if multiple files are selected, select the first .zip file that is found
    failed = false;
    for (var i = 0, f; f = files[i]; i++) {
        if (f.type == "application/zip" | f.type == "application/x-zip-compressed") {
            // exit loop
            failed = false;
            break;
        } else {
            failed = true;
        }
    }
    if (failed) {
        uploadInfo.innerHTML = "<p style='color:red;'>Please select a .zip file</p>";
        return;
    }

    handleFile(evt);

}, false);


// handle demoPackage
dempPackage = document.getElementById("demoPackage");
dempPackage.addEventListener('click', async function handleDemoPackage(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    uploadInfo.innerHTML = "<p style='color:green;'>Loading Awesomeness...</p>";

    // process data
    let demo = {
        "Profile": {
          "startDate": 1632050396533,
          "userName": "Beatstar#0",
          "userAvatar": 17,
          "userBanner": "https://beatbot.beatscore.eu/assets/banner?banner=BB501452963&user_name=_&user_avatar=https://via.placeholder.com/128x128.png&level=20&src=True",
          "userStars": 2596,
          "appOpenedTimes": 1818
        },
        "friendsOverview": {
          "userFriends": 7,
          "userBrags": 44,
          "recievedBrags": 25
        },
        "iapOverview": {
          "totalSpent": 794.640000000001,
          "iapTotalPerDay": 1.2435680751173726,
          "purchaseHistTotal": 83,
          "PurchaseHist": {
            "percentOfTotal": 51.365398167723754,
            "amountOfTotal": 408.1700000000005,
            "mostPurchasedItem": {
              "Name": "Event Token Pack",
              "ProductID": "bundle-event-token-299",
              "Amount": 65
            },
            "categories": {
              "Unique": 0,
              "Tour Pass": 12,
              "Evnt Tkns": 66,
              "Gem Pack": 0,
              "Unlmtd Play": 0,
              "Dx Cards": 7,
              "Gem Packs": 0,
            }
          }
        },
        "GameplayOverview": {
          "songsUnlocked": 520,
          "mostPlayedSong": {
            "1": {
              "Name": "Gangnam Style",
              "PlayedCount": 256
            },
            "2": {
              "Name": "Sandstorm",
              "PlayedCount": 175
            }
          },
          "Averages": {
            "gameAverage": {
              "Normal": {
                "Standard": 49922.49230769231,
                "Deluxe": 49898
              },
              "Hard": {
                "Standard": 74641.70833333333,
                "Deluxe": 74751.71052631579
              },
              "Extreme": {
                "Standard": 99013,
                "Deluxe": 96766.95238095238
              }
            },
            "TruAvr": {
              "Normal": {
                "Standard": 43092.18805518075,
                "Deluxe": 47771.25
              },
              "Hard": {
                "Standard": 62489.98418196045,
                "Deluxe": 52806.97656059615
              },
              "Extreme": {
                "Standard": 50229.49412671801,
                "Deluxe": 51706.92960631376
              }
            }
          },
          "Medals": {
            "g": 1,
            "p": 22,
            "d": 387,
            "dp": 108,
            "nm": 2
          }
        }
      };
    await updateDisplay(demo);
}, false);



// find all img elements
var imgs = document.getElementsByTagName('img');
// loop over all img elements
for (var i = 0; i < imgs.length; i++) {
    // add context menu event listener
    imgs[i].addEventListener('contextmenu', function(e) {
        // prevent default context menu
        e.preventDefault();
    }
    , false);
};