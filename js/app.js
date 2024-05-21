var Processlog = [
]; ProcessLogTotal = 0;
var siteError = ""

// get site-logo
let logo = document.getElementById('site-logo');
// apply onclick
logo.onclick = function() {
    if (siteError.length > 0) {
        document.getElementById('debugModal').style.display = 'block';
        document.getElementById('debugModalText').innerHTML = `${`
            <h2>Traceback:</h2>
            <div class="modal-error">
                <p>Something went wrong, please try again or contact me on <a href="https://discord.gg/jAbuWshfG3" onclick="window.open(this.href); return false;">discord</a>. (@foxboinick)</p>
                <pre>` 
                    + siteError + 
                `</pre>
            </div>
            <h2>Debug Chain:</h2>
            <pre style="max-height: 256px; overflow-y: auto;"><code>`+ Processlog.map((x, i) => `${i + 1}. ${x}`).join('<br><br>')}</code></pre>
            <br>
            <textarea id="rawData" style="height: 0px; opacity: 0;">TRACEBACK:\n\n${siteError}\nDEBUG CHAIN:\n\n${Processlog.map((x, i) => `${i + 1}. ${x}`).join('\n\n')}</textarea>
            <button id="copyDebugMessageButton" class="debugger-copy-button" onclick="document.getElementById('rawData').select(); document.execCommand('copy'); this.innerHTML = 'Copied!'; setTimeout(function(){document.getElementById('copyDebugMessageButton').innerHTML = 'Copy Debug Data';}, 3000);">Copy Debug Data</button>
        `;
    } else {
        if (Processlog.length == 0) {
            document.getElementById('debugModal').style.display = 'block';
            document.getElementById('debugModalText').innerHTML = '<br><h2>No Debug Data to Display</h2><br>';
        } else {
            document.getElementById('debugModal').style.display = 'block';
            document.getElementById('debugModalText').innerHTML = `${`
            <h2>Debug Chain:</h2>
            <pre style="max-height: 256px; overflow-y: auto;"><code>`+ Processlog.map((x, i) => `${i + 1}. ${x}`).join('<br><br>')}</code></pre>
            <br>
            <textarea id="rawData" style="height: 0px; opacity: 0;">DEBUG CHAIN:\n\n${Processlog.map((x, i) => `${i + 1}. ${x}`).join('\n\n')}</textarea>
            <button id="copyDebugMessageButton" class="debugger-copy-button" onclick="document.getElementById('rawData').select(); document.execCommand('copy'); this.innerHTML = 'Copied!'; setTimeout(function(){document.getElementById('copyDebugMessageButton').innerHTML = 'Copy Debug Data';}, 3000);">Copy Debug Data</button>
        `;
        }
    }
    return false;
}
var closeBtn = document.getElementById("DebugModalCloser");
closeBtn.onclick = function() {document.getElementById('debugModal').style.display = 'none';};
window.onclick = function(event) {
    if (event.target == document.getElementById('debugModal')) {document.getElementById('debugModal').style.display = 'none';};
    if (event.target == document.getElementById('helpModal')) {document.getElementById('helpModal').style.display = "none";};
};

var songData = {}
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
        "Category": "Event Tokens",
    },
    "shop-leaderboard-event-[0-9]+": {
        "Name": "Event Token Pack",
        "Category": "Event Tokens",
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
        "Category": "Unlimited Play",
    },

    // Less Common Products
    "liveops-bundle-170-liveops-bundle-launchDeluxe-150-cards": {
        "Name": "Deluxe Card Pack",
        "Category": "Deluxe Cards",
    },
    "liveops-bundle-[0-9]+-liveops-bundle-Deluxe-[0-9]+-cards": {
        "Name": "Deluxe Card Pack",
        "Category": "Deluxe Cards",
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
var medalThresholds = {
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
var starThresholds = {
    "Normal": {
        "1": 0,
        "2": 0.2,
        "3": 0.35,
        "4": 0.7,
        "5": 0.95,
    },
    "Hard": {
        "1": 0,
        "2": 0.2,
        "3": 0.5,
        "4": 0.8,
        "5": 0.95,
    },
    "Extreme": {
        "1": 0,
        "2": 0.2,
        "3": 0.5,
        "4": 0.8,
        "5": 0.95,
    }
}


async function processData(rawData) {

    Processlog.push("Fetching Song Data"); let startTime = new Date();
    Processlog.push("Fetched Song Data in " + (new Date() - startTime) + "ms");

    no_timeout = false;
    setTimeout(function(){ 
        if (no_timeout) return;
        Processlog.push("Processing Data Timed Out");
        uploadInfo.innerHTML = "<p style='color:red;'>An error occured processing your file, please try again or contact me on <a href='https://discord.gg/jAbuWshfG3' onclick='window.open(this.href); return false;'>discord</a>. (@foxboinick)</p>";
        return;
    }, 5000);
    
    ViewData = {};
    ViewData.RawConfig = {};
    ViewData.ProfileMap = {};
    ViewData.RewardSources = {};

    ViewData.Output = {};


    function GetConfig(Name)
    {
        return rawData[Name] ? rawData[Name] : null;   
    }

    function ParsePaymentHistory(payments)
    {
        Processlog.push("Parsing Payment History"); let startTime = new Date();
        let parced = 0;
        var Map = [];

        payments.forEach(function(payment){
            if(payment.receiptKey)
            {
                var Temp = {
                    Dates : {
                        Claimed : payment.claimedAt?new Date(payment.claimedAt):null,
                        Updated : payment.updatedAt?new Date(payment.updatedAt):null,
                    },
                    Prices : {
                        USD: payment.purchase.usdTierPrice,
                        Local: parseFloat(payment.purchase.localPrice),
                        Currency: payment.purchase.currencyCode
                    },
                    Name: payment.purchase.productId,
                    Source: payment.purchase.trafficSource
                };
                Map.push(Temp);
                parced++;
            }

        });

        Processlog.push(`Parced ${parced} Payments in ${new Date() - startTime}ms`);
        
        return Map;
    }

    function ParseProfile(profile)
    {
        Processlog.push("Parsing Profile"); let startTime = new Date();
        var Response = {};


        Response.BasicInfo = {
            Banner : profile.playerVisuals.callingCard.templateId,
            ProfileIconId: profile.playerVisuals.profileIconId,
            FacebookId: profile.basicInfo.facebookAppScopedId,
            FacebookImage: profile.basicInfo.saCustomImageKey,
        }

        Response.Songs = {
            AvailableSongs : profile.beatmaps.beatmaps.map(function(x){ return ParseSongData(x)}),
            //RemovedSongs : profile.beatmaps.removedBeatmaps.map(function(x){ return ParseSongData(x)}),
            Stats : {
                Started: profile.beatmaps.totalStartedCount,
                Finished: profile.beatmaps.totalPlayedCount
            }
        }

        Response.Cases = {
            Total: profile.cases.numCasesOpened
        }
        
        Response.Currencies = {
            Stars: 0,
            Vinyls: 0,
            Gems: 0,
            TourPoints: 0,
            EventTokens: 0
        }

        profile.currencies.forEach(function(currency) {
            switch(currency.currencyId)
            {
                case 3:
                    Response.Currencies.Gems = currency.amount;
                    break;
                case 5:
                    Response.Currencies.Vinlys = currency.amount;
                    break;
                case 7:
                    Response.Currencies.Stars = currency.amount;
                    break;
                case 8:
                    Response.Currencies.TourPoints = currency.amount;
                    break;
                case 9:
                    Response.Currencies.EventTokens = currency.amount;
                    break;
            }
        });

        Response.PremiumActive = profile.seasons.premiumPassActive;
        

        Response.Banners = profile.callingCards.unlockedCallingCards.map(function(x){ return {BannerId: x.templateId, EliteRank : x.seasonLevel>0?x.seasonLevel:null}});

        Response.Emojis = profile.emojis.unlockedEmojis_newId.map(function(x){ return {EmojiId: x}});
        
        Response.Brags = profile.friendBrags.Brags.map(function(x){ return ParseBragData(x)});

        Response.LikedSongs = profile.likedBeatmaps.likedBeatmapsId.map(function(x) { return {BeatmapId: x}});

        Response.UserName = {
            Formatted:  `${profile.name}#${profile.nameUid}`,
            Name : profile.name,
            Discriminator: profile.nameUid
        }

        Response.SongCases = {
            History : profile.recordBoxOpening.previouslyOpenedGachaBoxesId.map(function(x) { return {GachaBoxId: x}}),
            Next: profile.recordBoxOpening.nextGachaBox ? profile.recordBoxOpening.nextGachaBox.boxId : 0
        }

        Response.ApplicationData = {
            Installed: new Date(profile.sharplaData.creationTime),
            LastStart: new Date(profile.sharplaData.lastSessionStartTime),
            StartedCount: profile.sharplaData.sessionCount,
            Platform: GetPlatform(profile.sharplaData.platform),
            AppId: profile.sharplaData.appId,
            ClientVersion: profile.sharplaData.clientVersion,
            AppVersion: profile.session.appVersion
        }

        profile.subProfileTOs.forEach(function(to){
            if(to.LastPurchaseTime)
                Response.BasicInfo.LastPurchaseDate = new Date(to.LastPurchaseTime);
        })      
        
        Processlog.push(`Parsed Profile in ${new Date() - startTime}ms`);

        return Response;
    }
    

    function GetPlatform(platform)
    {
        switch(platform)
        {
            case 8: return "iPhone";
            case 11: return "Android";
            default: return `Unknown platform [${platform}]`;
        }
    }

    function ParseBragData(brag)
    {
        var Object = {
            Hidden: brag.hidden,
            BeatmapId: 795,
            UserId: brag.braggerPlayerId,
            TimeStamps : {
                Created: new Date(brag.date),
                Updated: new Date(brag.dateOfLastUpdate)
            },
            EmoteId: brag.emoteId,
            Score: {
                Normalized: brag.scoreToBeat.normalizedScore,
                Absolute: brag.scoreToBeat.absoluteScore
            }
        }

        return Object;
    }

    function CalculateBrags(config) {
        let sentBrags = 0;
        for (beatmap of config.beatmaps.beatmaps) {
            sentBrags += beatmap.BragState.braggedToPlayers.length;
        }

        return sentBrags;

    }

    function ParseSongData(song)
    {
        try{

            if(ViewData.RewardSources[song.RewardedSource])
            {
                ViewData.RewardSources[song.RewardedSource]++;
            }
            else
            {
                ViewData.RewardSources[song.RewardedSource] = 1;
            }
    
            // get medal from medalThresholds
            var medal = "None";
            var medalId = null;
            // iterate through medalThresholds[songData[song.templateId].Type][songData[song.templateId].Difficulty]
            // key = medal, value = score required
            for (var key in medalThresholds[songData[song.templateId].Type][songData[song.templateId].Difficulty]) {
                if (song.HighestScore.absoluteScore >= medalThresholds[songData[song.templateId].Type][songData[song.templateId].Difficulty][key]) {
                    medal = key;
                    switch(key)
                    {
                        case 'Gold': medalId = 1; break;
                        case 'Platinum': medalId = 2; break;
                        case 'Diamond': medalId = 3; break;
                        case 'Diamond Perfect': medalId = 4; break;
                    }
                }
            }
    
            var stars = 0;
            // iterate through starThresholds[songData[song.templateId].Difficulty]
            // key = star, value = score required
            for (var key in starThresholds[songData[song.templateId].Difficulty]) {
                if (song.HighestScore.normalizedScore >= starThresholds[songData[song.templateId].Difficulty][key]) {
                    // to int
                    stars = parseInt(key);
                }
                if (song.PlayedCount == 0) {
                    stars = 0;
                }
            }
    
            var Object = {
                SongVersionId: songData[song.templateId].SongVersionId || 0,
                Name: songData[song.templateId].Name || "Unknown",
                Type: songData[song.templateId].Type || "Unknown",
                Artist: songData[song.templateId].Artist || "---",
                Difficulty: songData[song.templateId].Difficulty || "Normal",
                Genres: songData[song.templateId].Genres || ["Unknown"],
                AlbumCover: `/image/cover/${songData[song.templateId].CoverId}` || undefined,
                Score: {
                    Medal: medal,
                    MedalId: medalId,
                    Stars: stars,
                    HighestScore : {
                        Normalized : song.HighestScore.normalizedScore,
                        Absolute : song.HighestScore.absoluteScore,
                    },
                    Total : {
                        Normalized : song.NormalizedLifetimeScore,
                        Absolute : song.AbsoluteLifetimeScore,
                    },
                    HighestStreak: song.HighestStreak,
                    MaxGrade: song.HighestGradeId,
                    MaxCheckpoint: song.HighestCheckpoint,
                },
                Counters : {
                    Played : song.PlayedCount,
                    Unfinished : song.UnfinishedPlayCount,
                    Bragged : song.BragState.braggedToPlayers.length
                },
                Version: song.Version,
                BeatmapId: song.templateId,
                
                PlayCount : song.PlayedCount,
                Source: song.RewardedSource,
            };
    
        return Object;
        } catch (e) {
            Processlog.push(`Failed to parse song ${song.templateId}\n${e}`);
            siteError = `Failed to parse song ${song.templateId}\n${e}`
            uploadInfo.innerHTML = "<p style='color:red;'>An error occured processing your file (ParseSongData), please try again or contact me on <a href='https://discord.gg/jAbuWshfG3' onclick='window.open(this.href); return false;'>discord</a>. (@foxboinick)</p>";
            // simclick
            let logo = document.getElementById('site-logo');
            logo.click();
            return;    
        }

    }

    function GetMostPurchasedItem(paymentHistoryJson) {
        // filter out items that dont have receiptKey 
        paymentHistoryJson = paymentHistoryJson.filter(function (item) {
            return item.receiptKey;
        });
        temp = {};
        items = [];
        unreadableitems = [];
        fallback = [];
        readable = [];
        categories = {
            "Unique": 0,
            "Tour Pass": 0,
            "Event Tokens": 0,
            "Gem Packs": 0,
            "Unlimited Play": 0,
            "Deluxe Cards": 0,
        };
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
        
        return [{
            Name: temp.Name,
            ProductID: temp.ProductID,
            Amount: temp.Amount,
        }, categories];
    }

    function CalculateSongAveragesAndMedals(profileJson) {

        Processlog.push(`Calculating Song Averages and Medals...`); let startTime = new Date();

        let medalData = {
            "dp": 0,
            "d": 0,
            "p": 0,
            "g": 0,
            "nm": 0,
        }

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


        for (song of profileJson.beatmaps.beatmaps) {
            songInfo = songData[song.templateId];
            if (songInfo === undefined) {
                Processlog.push("Song not found in BDPE: " + song.templateId);
                continue;
            }
            if (songInfo.Difficulty === "Normal") {
                if (songInfo.Type === "Standard") {
                    standardSongs.Normal.push(song);
                    
                    // SET MEDAL
                    if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Normal["Diamond Perfect"]) {
                        medalData.dp++;
                    }
                    else if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Normal["Diamond"]) {
                        medalData.d++;
                    }
                    else if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Normal["Platinum"]) {
                        medalData.p++;
                    }
                    else if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Normal["Gold"]) {
                        medalData.g++;
                    }
                    else {
                        medalData.nm++;
                    }

                } else if (songInfo.Type === "Deluxe") {
                    deluxeSongs.Normal.push(song);

                    // SET MEDAL
                    if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Normal["Diamond Perfect"]) {
                        medalData.dp++;
                    }
                    else if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Normal["Diamond"]) {
                        medalData.d++;
                    }
                    else if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Normal["Platinum"]) {
                        medalData.p++;
                    }
                    else if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Normal["Gold"]) {
                        medalData.g++;
                    }
                    else {
                        medalData.nm++;
                    }

                }
            } else if (songInfo.Difficulty === "Hard") {
                if (songInfo.Type === "Standard") {
                    standardSongs.Hard.push(song);

                    // SET MEDAL
                    if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Hard["Diamond Perfect"]) {
                        medalData.dp++;
                    }
                    else if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Hard["Diamond"]) {
                        medalData.d++;
                    }
                    else if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Hard["Platinum"]) {
                        medalData.p++;
                    }
                    else if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Hard["Gold"]) {
                        medalData.g++;
                    }
                    else {
                        medalData.nm++;
                    }

                } else if (songInfo.Type === "Deluxe") {
                    deluxeSongs.Hard.push(song);
                    
                    // SET MEDAL
                    if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Hard["Diamond Perfect"]) {
                        medalData.dp++;
                    }
                    else if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Hard["Diamond"]) {
                        medalData.d++;
                    }
                    else if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Hard["Platinum"]) {
                        medalData.p++;
                    }
                    else if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Hard["Gold"]) {
                        medalData.g++;
                    }
                    else {
                        medalData.nm++;
                    }

                }
            } else if (songInfo.Difficulty === "Extreme") {
                if (songInfo.Type === "Standard") {
                    standardSongs.Extreme.push(song);

                    // SET MEDAL
                    if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Extreme["Diamond Perfect"]) {
                        medalData.dp++;
                    }
                    else if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Extreme["Diamond"]) {
                        medalData.d++;
                    }
                    else if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Extreme["Platinum"]) {
                        medalData.p++;
                    }
                    else if (song.HighestScore.absoluteScore >= medalThresholds.Standard.Extreme["Gold"]) {
                        medalData.g++;
                    }
                    else {
                        medalData.nm++;
                    }

                } else if (songInfo.Type === "Deluxe") {
                    deluxeSongs.Extreme.push(song);

                    // SET MEDAL
                    if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Extreme["Diamond Perfect"]) {
                        medalData.dp++;
                    }
                    else if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Extreme["Diamond"]) {
                        medalData.d++;
                    }
                    else if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Extreme["Platinum"]) {
                        medalData.p++;
                    }
                    else if (song.HighestScore.absoluteScore >= medalThresholds.Deluxe.Extreme["Gold"]) {
                        medalData.g++;
                    }
                    else {
                        medalData.nm++;
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

            if (song.PlayedCount === 0) {
                dataavrs.TruAvr.Normal.Standard += song.HighestScore.absoluteScore;
            } else {
                dataavrs.TruAvr.Normal.Standard += song.AbsoluteLifetimeScore / song.PlayedCount;
            }
        }
        dataavrs.gameAverage.Normal.Standard /= standardSongs.Normal.length;
        dataavrs.TruAvr.Normal.Standard /= standardSongs.Normal.length;
    
        for (song of standardSongs.Hard) {
            dataavrs.gameAverage.Hard.Standard += song.HighestScore.absoluteScore;

            if (song.PlayedCount === 0) {
                dataavrs.TruAvr.Hard.Standard += song.HighestScore.absoluteScore;
            } else {
                dataavrs.TruAvr.Hard.Standard += song.AbsoluteLifetimeScore / song.PlayedCount;
            }
        }
        dataavrs.gameAverage.Hard.Standard /= standardSongs.Hard.length;
        dataavrs.TruAvr.Hard.Standard /= standardSongs.Hard.length;
    
        for (song of standardSongs.Extreme) {
            dataavrs.gameAverage.Extreme.Standard += song.HighestScore.absoluteScore;

            if (song.PlayedCount === 0) {
                dataavrs.TruAvr.Extreme.Standard += song.AbsoluteLifetimeScore
            } else {
                dataavrs.TruAvr.Extreme.Standard += song.HighestScore.absoluteScore / song.PlayedCount;
            }
        }
        dataavrs.gameAverage.Extreme.Standard /= standardSongs.Extreme.length;
        dataavrs.TruAvr.Extreme.Standard /= standardSongs.Extreme.length;
    
        for (song of deluxeSongs.Normal) {
            dataavrs.gameAverage.Normal.Deluxe += song.HighestScore.absoluteScore;

            if (song.PlayedCount === 0) {
                dataavrs.TruAvr.Normal.Deluxe += song.HighestScore.absoluteScore;
            } else {
                dataavrs.TruAvr.Normal.Deluxe += song.AbsoluteLifetimeScore / song.PlayedCount;
            }
        }
        dataavrs.gameAverage.Normal.Deluxe /= deluxeSongs.Normal.length;
        dataavrs.TruAvr.Normal.Deluxe /= deluxeSongs.Normal.length;
    
        for (song of deluxeSongs.Hard) {
            dataavrs.gameAverage.Hard.Deluxe += song.HighestScore.absoluteScore;

            if (song.PlayedCount === 0) {
                dataavrs.TruAvr.Hard.Deluxe += song.HighestScore.absoluteScore;
            } else {
                dataavrs.TruAvr.Hard.Deluxe += song.AbsoluteLifetimeScore / song.PlayedCount;
            }
        }
        dataavrs.gameAverage.Hard.Deluxe /= deluxeSongs.Hard.length;
        dataavrs.TruAvr.Hard.Deluxe /= deluxeSongs.Hard.length;
    
        for (song of deluxeSongs.Extreme) {
            dataavrs.gameAverage.Extreme.Deluxe += song.HighestScore.absoluteScore;

            if (song.PlayedCount === 0) {
                dataavrs.TruAvr.Extreme.Deluxe += song.HighestScore.absoluteScore;
            } else {
                dataavrs.TruAvr.Extreme.Deluxe += song.AbsoluteLifetimeScore / song.PlayedCount;
            }
        }
        dataavrs.gameAverage.Extreme.Deluxe /= deluxeSongs.Extreme.length;
        dataavrs.TruAvr.Extreme.Deluxe /= deluxeSongs.Extreme.length;

        Processlog.push("Calculated Song Averages and Medals in " + (Date.now() - startTime) + "ms")

        return [
            dataavrs,
            medalData,
        ]
    }

    async function CalculateMostPlayedSongs(profileJson) {

        let objectResponse = Promise.all([songData])
        .then(function(SongData){
            // gameplayOverview.mostPlayedSong.1 and 2
            let mostPlayedSongs = [];
            // iterate through beatmaps.beatmaps and find the most played song using  "PlayedCount" as a filter
            filter = profileJson.beatmaps.beatmaps.filter(beatmap => beatmap.PlayedCount > 0);
            filter.sort((a, b) => b.PlayedCount - a.PlayedCount).templateId;
            
            for (song of filter) {
                if (songData[song.templateId] != undefined) {
                    mostPlayedSongs.push({
                        "Name": songData[song.templateId].Name,
                        "PlayedCount": song.PlayedCount,
                        "TemplateId": song.templateId,
                    })
                }
            }
            return mostPlayedSongs;
        })
        .catch(function(err){
            console.log(err);
        })

        // syncronous await for the objectResponse
        return await objectResponse;
    }

    mostPlayedSongs = await CalculateMostPlayedSongs(GetConfig("profile"));
    Promise.all([GetConfig("payment_history"), GetConfig("payment_stats"), GetConfig("friends"), GetConfig("user_identity"), GetConfig("profile")])
    .then(function(configs){
        ViewData.RawConfig.PaymentHistory = configs[0];
        ViewData.ProfileMap.PaymentHistory = ParsePaymentHistory(configs[0]);

        ViewData.RawConfig.PaymentStats = configs[1]; 

        ViewData.RawConfig.Friends = configs[2]; 

        ViewData.RawConfig.UserIdentity = configs[3]; 

        ViewData.RawConfig.Profile = configs[4]; 

        ViewData.ProfileMap.PaymentStats = {
            TotalSpent : Math.round(configs[1].iapSpend * 100 ) / 100 || 0,
        }
        
        ViewData.ProfileMap.Friends = ViewData.RawConfig.Friends;

        ViewData.ProfileMap.UserIdentity = {
            SuperCellId : ViewData.RawConfig.UserIdentity.supercellID,
            PendingDeletion : ViewData.RawConfig.UserIdentity.pendingDeletion,
        }
        
        ViewData.ProfileMap.Profile = ParseProfile(configs[4]); 

        CurrencyValue = "USD"
        try {
            CurrencyValue = ViewData.ProfileMap.PaymentHistory[0].Prices.Currency
        } catch {
            CurrencyValue = "USD"
        }

        ViewData.Output.PaymentHistory = {
            TotalSpent: Math.round(ViewData.ProfileMap.PaymentHistory.map(x => x.Prices.USD).reduce((a,b) => a + b, 0) * 100) / 100,
            TotalSpentLocal: Math.round(ViewData.ProfileMap.PaymentHistory.map(x => x.Prices.Local).reduce((a,b) => a + b, 0) * 100) / 100,
            Currency: CurrencyValue,
            Count: ViewData.ProfileMap.PaymentHistory.length,
            MostPurchasedItem: GetMostPurchasedItem(configs[0])[0],
            Categories: GetMostPurchasedItem(configs[0])[1],
        }


        ViewData.Output.PaymentStats = ViewData.ProfileMap.PaymentStats;

        ViewData.Output.User = {
            Friends : {
                Friends: ViewData.ProfileMap.Friends,
                Count: ViewData.ProfileMap.Friends.length
            },
            SuperCellId : ViewData.ProfileMap.UserIdentity.SuperCellId,
            PendingDeletion : ViewData.ProfileMap.UserIdentity.PendingDeletion,
            Profile : ViewData.ProfileMap.Profile,
            Brags : {
                Sent: CalculateBrags(configs[4]),
                Received: ViewData.ProfileMap.Profile.Brags.length
            }
        }

        ViewData.Output.Songs = {
            Count:ViewData.ProfileMap.Profile.Songs.AvailableSongs.length,
            Averages: CalculateSongAveragesAndMedals(configs[4])[0],
            Medals: CalculateSongAveragesAndMedals(configs[4])[1],
            MostPlayed: mostPlayedSongs,
        } //Finish this           
        
        //console.log(ViewData);
        // update display
        no_timeout = true;

        // check data package version against current version (1.0.0) if not equal or greater than, display error
        // example version: 28.0.3.1993
        let UserVersion = ViewData.Output.User.Profile.ApplicationData.AppVersion.split(".");
        let CurrentVersion = "28.1".split(".");
        for (let i = 0; i < UserVersion.length; i++) {
            if (parseInt(UserVersion[i]) > parseInt(CurrentVersion[i])) {
                break;
            } else if (parseInt(UserVersion[i]) < parseInt(CurrentVersion[i])) {
                let namez = {
                    "0": "Major",
                    "1": "Minor",
                    "2": "Patch",
                    "3": "Build",
                }
                console.log(`Data package ${namez[i]} version is ${UserVersion[i]}, current version is ${CurrentVersion[i]}`);
                console.log(`Data package version is ${ViewData.Output.User.Profile.ApplicationData.AppVersion}, current version is ${CurrentVersion.join(".")}`);
                Processlog.push(`Data package ${namez[i]} version is ${UserVersion[i]}, current version is ${CurrentVersion[i]}`);
                Processlog.push(`Data package version is ${ViewData.Output.User.Profile.ApplicationData.AppVersion}, current app version is ${CurrentVersion.join(".")}`);
            }
        }

        updateDisplay(ViewData.Output);
    });
    
}

async function updateDisplay(DisplayData) {
    Processlog.push("Updating Display"); let startTime = Date.now();
    console.log(DisplayData);
    // update user preium pin
    let premiumPin = document.getElementById("TourPassPin");
    if (!DisplayData.User.Profile.PremiumActive) {
        premiumPin.style.display = "none";
    } else {
        null;
    }


    // update user start date
    let humanReadableDate = new Date(DisplayData.User.Profile.ApplicationData.Installed);
    document.getElementById("userStartDate").innerHTML = humanReadableDate.toLocaleDateString("en-US");

    // (Date.now() - humanReadableDate) / 31536000000 to one decimal place e.g. 1.9 years ago (1.99 is still 1.9)
    let yearsAgo = Math.floor((Date.now() - humanReadableDate) / 31536000000 * 10) / 10;
    document.getElementById("userStartDateComment").innerHTML = yearsAgo + " years ago" + " (" + humanReadableDate.toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }) + ")";
    // update user name
    document.getElementById("userName").innerHTML = DisplayData.User.Profile.UserName.Formatted;
    // update user avatar

    let avatarData = undefined;
    try {
        avatarData = await fetch("/bdpe_data/api/avatars.php").then((res) => res.json());
    } catch (e) {
        avatarData = undefined;
    }

    document.getElementById("userAvatar").src = (avatarData[DisplayData.User.Profile.BasicInfo.ProfileIconId] ? `/image/avatar/${avatarData[DisplayData.User.Profile.BasicInfo.ProfileIconId].AvatarId}` : "/bdpe_data/img/logo.jpg");
    // update user banner
    document.getElementById("userBanner").style.backgroundImage = `url(https://beatbot.beatscore.eu/assets/banner?banner=BB${DisplayData.User.Profile.BasicInfo.Banner}&user_name=_&user_avatar=https://via.placeholder.com/128x128.png&level=20&src=True`
    // update user stars
    document.getElementById("userStars").innerHTML = DisplayData.User.Profile.Currencies.Stars;

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
        if (DisplayData.User.Friends.Count >= key) {
            if (key in (friendscomments)) {
                comment = friendscomments[key];
            }
        }
    }
    document.getElementById("userFriends").innerHTML = DisplayData.User.Friends.Count;
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
        if (DisplayData.User.Brags.Sent >= key) {
            if (key in (bragsComments)) {
                comment = bragsComments[key];
            }
        }
    }
    document.getElementById("userBrags").innerHTML = DisplayData.User.Brags.Sent;
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
        if (DisplayData.User.Brags.Received >= key) {
            if (key in (recievedBragsComments)) {
                comment = recievedBragsComments[key];
            }
        }
    }
    document.getElementById("recievedBrags").innerHTML = DisplayData.User.Brags.Received;
    document.getElementById("recievedBragsComment").innerHTML = comment;

    // update user app opened times
    document.getElementById("appOpenedTimes").innerHTML = DisplayData.User.Profile.ApplicationData.StartedCount;
    let installedDate = new Date(DisplayData.User.Profile.ApplicationData.Installed);
    let timesADay = DisplayData.User.Profile.ApplicationData.StartedCount / ((Date.now() - installedDate) / 86400000);
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
        if (DisplayData.PaymentStats.TotalSpent >= key) {
            if (key in (iapTotalComments)) {
                comment = iapTotalComments[key];
            }
        }
    }
    // round to 2 decimal places
    document.getElementById("iapTotal").innerHTML = "$" + DisplayData.PaymentStats.TotalSpent + " USD";
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

    let TotalPerDay = (DisplayData.PaymentStats.TotalSpent / ((Date.now() - installedDate) / 86400000)).toFixed(2);
    document.getElementById("iapDailyAverage").innerHTML = "$" + TotalPerDay + " USD";
    comment = ""
    // get the highest key that is lower or equal to the user's iap daily average
    for (const key in iapDailyAverageComments) {
        if (TotalPerDay >= key) {
            if (key in (iapDailyAverageComments)) {
                comment = iapDailyAverageComments[key];
            }
        }
    }
    document.getElementById("iapDailyAverageComment").innerHTML = "Gifting Space Ape " + comment + " every day!";


    // update purchase history total
    document.getElementById("purchaseHistTotal").innerHTML = DisplayData.PaymentHistory.Count;

    // percentage of purchases that are last 100   
    percOfTot = (DisplayData.PaymentHistory.TotalSpent/DisplayData.PaymentStats.TotalSpent*100).toFixed(2);
    // if percOfTot is not a number
    if (isNaN(percOfTot)) {
        percOfTot = 0;
    }

    document.getElementById("percentOfTotal").innerHTML = percOfTot + "%";
    document.getElementById("percentOfTotalComment").innerHTML = "(rounded to 2 decimal places)";

    // fave product
    document.getElementById("faveProduct").innerHTML = DisplayData.PaymentHistory.MostPurchasedItem.Name || "F2P";
    document.getElementById("faveProductComment").innerHTML = DisplayData.PaymentHistory.MostPurchasedItem.Amount + " of your " + DisplayData.PaymentHistory.Count + " purchases were this item!";

    Res = DisplayData.PaymentHistory
    colors = {
        "Unique": "#912d7a",
        "Tour Pass": "#2f2d91",
        "Event Tokens": "#916e2d",
        "Gem Packs": "#2d8491",
        "Unlimited Play": "#917f2d",
        "Deluxe Cards": "#5a2d91",
    }
  
    var total = 0;
    Object.keys(Res.Categories).forEach(function(key){
        total+=Res.Categories[key];
    });
    
    LinesDOM = "";
    
    Object.keys(Res.Categories).forEach(function(key){
        // color random
        LinesDOM+= `<div class="inner" style="width:${Res.Categories[key] / total * 100}%; background-color: ${colors[key]};">${Math.round(Res.Categories[key] / total * 100)}%</div>`;
    });
    
    let frame = document.getElementById("frame");
    frame.innerHTML += `<div class="outer">${LinesDOM}</div>`;
    
    frame.innerHTML += `<ul class="legend">${Object.keys(Res.Categories).map(function(x) { if (Res.Categories[x] > 0) { return `<li class="legend-key" style="--li-color: ${colors[x]};">${x}: ${Res.Categories[x]}</li>`} else { return "" }}).join("")}</ul>`;

    // songs unlocked
    document.getElementById("songsUnlocked").innerHTML = DisplayData.Songs.Count;

    // get total song count from api GET
    // https://beatbot.beatscore.eu/api/count/songs
    // ["count"]
    let totalSongs = 0;
    try {
        totalSongs = await fetch("https://beatbot.beatscore.eu/api/count/songs")
            .then(response => response.json())
            .then(data => {
                return data["count"];
            })
    } catch (err) {
        console.log(err);
        loading = false;
        Processlog.push(`An error occured while fetching the total song count from the API:\n${err}`);
        uploadInfo.innerHTML = "<p style='color:red;'>An error occured processing your file (CountSongs), please try again or contact me on <a href='https://discord.gg/jAbuWshfG3' onclick='window.open(this.href); return false;'>discord</a>. (@foxboinick)</p>";
        no_timeout = true;
        
        siteError = `An error occured while fetching the total song count from the API:\n${err}`;
        let logo = document.getElementById('site-logo');
        logo.click();
        
        return;
    }

    document.getElementById("songsUnlockedComment").innerHTML = "That's " + Math.round((DisplayData.Songs.Count / totalSongs) * 100) + "% of all songs!";

    document.getElementById("mostPlayed1").innerHTML = DisplayData.Songs.MostPlayed[0].Name;
    document.getElementById("mostPlayed2").innerHTML = DisplayData.Songs.MostPlayed[1].Name;
    document.getElementById("mostPlayedCommand").innerHTML = "With a total of " + (DisplayData.Songs.MostPlayed[0].PlayedCount) + " and " + (DisplayData.Songs.MostPlayed[1].PlayedCount) + " plays respectively!";

    // update averages
    // game average. If NaN, set to 0
    document.getElementById("AverageNormal").innerHTML = Math.round(DisplayData.Songs.Averages.gameAverage.Normal.Standard) || 0;
    document.getElementById("AverageHard").innerHTML = Math.round(DisplayData.Songs.Averages.gameAverage.Hard.Standard) || 0;
    document.getElementById("AverageExtreme").innerHTML = Math.round(DisplayData.Songs.Averages.gameAverage.Extreme.Standard) || 0;
    document.getElementById("AverageDeluxeNormal").innerHTML = Math.round(DisplayData.Songs.Averages.gameAverage.Normal.Deluxe) || 0;
    document.getElementById("AverageDeluxeHard").innerHTML = Math.round(DisplayData.Songs.Averages.gameAverage.Hard.Deluxe) || 0;
    document.getElementById("AverageDeluxeExtreme").innerHTML = Math.round(DisplayData.Songs.Averages.gameAverage.Extreme.Deluxe) || 0;

    // tru average
    document.getElementById("TruAverageNormal").innerHTML = Math.round(DisplayData.Songs.Averages.TruAvr.Normal.Standard) || "0 (NaN)";
    document.getElementById("TruAverageHard").innerHTML = Math.round(DisplayData.Songs.Averages.TruAvr.Hard.Standard) || 0;
    document.getElementById("TruAverageExtreme").innerHTML = Math.round(DisplayData.Songs.Averages.TruAvr.Extreme.Standard) || 0;
    document.getElementById("TruAverageDeluxeNormal").innerHTML = Math.round(DisplayData.Songs.Averages.TruAvr.Normal.Deluxe) || 0;
    document.getElementById("TruAverageDeluxeHard").innerHTML = Math.round(DisplayData.Songs.Averages.TruAvr.Hard.Deluxe) || 0;
    document.getElementById("TruAverageDeluxeExtreme").innerHTML = Math.round(DisplayData.Songs.Averages.TruAvr.Extreme.Deluxe) || 0;

    let mpievalues = [
        DisplayData.Songs.Medals.dp,
        DisplayData.Songs.Medals.d,
        DisplayData.Songs.Medals.p,
        DisplayData.Songs.Medals.g,
        DisplayData.Songs.Medals.nm
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
        height: 350,
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

    var filterJson = {};
    // Song Search Filter System
    async function getSearch(songs, q, filter) {
        // get search results
        let searchResults = songs.filter(function(song) {
            return song.Name.toLowerCase().includes(q);
        }
        )
        
        // use filter(json) to filter search results
        for (const [key, value] of Object.entries(filter)) {
            searchResults = searchResults.filter(function(song) {
                // return if value array contains value in song key
                for (item of value) {
                    if (song[key].includes(item)) {
                        return true;
                    }
                }
            })
        }

        // get filterbar-order
        var filterBarOrder = document.getElementById("filterbar-order");
        // check if filterbar has active class
        var active = filterBarOrder.classList.contains("active");

        // if active sort lowest to highest score (ascending) else sort highest to lowest score (descending)
        if (active) {
            searchResults.sort(function(a, b) {
                return b.Score.HighestScore.Normalized - a.Score.HighestScore.Normalized;
            }
            );
        } else {
            searchResults.sort(function(a, b) {
                return a.Score.HighestScore.Normalized - b.Score.HighestScore.Normalized;
            }
            );
        }
        
        if (searchResults.length == 0) {
            return [`<div class="noselect search-item">
            <div class="song-image noselect">
                <img src="/bdpe_data/img/logo.jpg" alt="Song Image">
            </div>
            <div class="song-info noselect">
                <p class="song-name noselect">No Results Found</p>
                <p class="song-author noselect">Try a different search query or filter</p>
            </div>
            <div class="song-score noselect">
            </div>
        </div>`, searchResults.length];
        }
        return [searchResults.map(function(song) {
            if (song.Name.startsWith("[Deluxe]")) {
                song.Name = song.Name.slice(8);
                song.Deluxe = true;
            }
            
            console.log(song.Score.Stars);

            return `<div class="noselect search-item ${song.Deluxe ? "deluxe" : ""}">
            <div class="song-image noselect">
                <img src="${song.AlbumCover}" alt="Song Image">
                ${
                    song.Difficulty != "Normal" ? `<div class="song-difficulty-icon"><img src="/bdpe_data/img/difficulty/${song.Difficulty}.png" alt=" "></div>` : ""
                }
            </div>
            <div class="song-info noselect">
                <p class="song-name noselect">${song.Name}</p>
                <p class="song-author noselect">${song.Artist}</p>
            </div>
            <div class="song-score noselect">
                <div class="song-stars noselect">${`<img src="/bdpe_data/img/star.webp" height="15px" width="15px"></img>`.repeat(song.Score.Stars)}${`<img src="/bdpe_data/img/starnt.webp" height="15px" width="15px"></img>`.repeat(5 - song.Score.Stars)}</div>
                <p class="song-medal noselect">${song.Score.Medal != "No Medal" ? `<img src="/bdpe_data/img/medals/${song.Type.toLowerCase()}/${song.Score.Medal.toLowerCase().replace(" ", "_")}.webp" height="25px" width="25px"></img>` : ""}</p>
            </div>
        </div>`;
        }
        ).join(""), searchResults.length];
    }

    // get search bar
    var searchBar = document.getElementById("songsearch");
    // attach event listener
    searchBar.addEventListener("keyup", async function() {
        // make sure user has stopped typing
        clearTimeout(typingTimer);
        var typingTimer = setTimeout(async function() {
            Processlog.push(`Updating Search Results...\nquery: ${q}\nfilter: ${JSON.stringify(filterJson, null, 2)}\nsorting: ${document.getElementById("filterbar-order").classList.contains("active") ? "ascending" : "descending"}`); let startTime = Date.now();
            // get search query
            var q = searchBar.value.toLowerCase();
            // update search
            let searchResults = await getSearch(DisplayData.User.Profile.Songs.AvailableSongs, q, filterJson);
            // update search results
            document.getElementById("song-search-results").innerHTML = searchResults[0];
            // update
            Processlog.push(`Updated Search Results in ${Date.now() - startTime}ms with ${searchResults[1]} results`);

        }, 500);
    });

    // get filterbar
    var filterBar = document.getElementById("songfilterbar-dropdown");
    var filterButton = document.getElementById("filterbutton");

    // attach event listener
    filterButton.addEventListener("click", async function() {
        // show dropdown
        filterBar.classList.toggle("active");
    });
    // if user clicks outside of dropdown
    window.addEventListener("click", async function(event) {
        if (!filterBar.contains(event.target) && !filterButton.contains(event.target)) {
            // hide dropdown
            filterBar.classList.remove("active");
        }
    });

    // get filterbar items
    var filterBarItems = document.getElementsByClassName("item-content-item");
    // attach event listener
    for (var i = 0; i < filterBarItems.length; i++) {
        filterBarItems[i].addEventListener("click", async function() {
            var filterBarItem = this;
            var filterBarItemCategory = filterBarItem.parentElement.parentElement.getElementsByClassName("item-title")[0].innerHTML;

            filterBarItem.classList.toggle("active");
            filterJson = {};

            for (var i = 0; i < filterBarItems.length; i++) {

                var filterBarItem = filterBarItems[i];
                var filterBarItemCategory = filterBarItem.parentElement.parentElement.getElementsByClassName("item-title")[0].innerHTML;
                var filterBarItemValue = filterBarItem.getElementsByTagName("label")[0].innerHTML;
                filterBarItemValue = filterBarItemValue.replace(/&amp;/g, "&");
                var filterBarItemActive = filterBarItem.classList.contains("active");

                if (filterBarItemActive) {
                    if (!filterJson.hasOwnProperty(filterBarItemCategory)) {
                        filterJson[filterBarItemCategory] = [];
                    }
                    if (!filterJson[filterBarItemCategory].includes(filterBarItemValue)) {
                        filterJson[filterBarItemCategory].push(filterBarItemValue);
                    }
                }
            }

            // update filterbar button
            let query = searchBar.value.toLowerCase();
            let searchResults = await getSearch(DisplayData.User.Profile.Songs.AvailableSongs, query, filterJson);
            document.getElementById("song-search-results").innerHTML = searchResults[0];
        });
    }

    // get filterbar-order
    var filterBarOrder = document.getElementById("filterbar-order");
    // attach event listener
    filterBarOrder.addEventListener("click", async function() {
        // toggle active
        filterBarOrder.classList.toggle("active");
        // get search query
        var q = searchBar.value.toLowerCase();
        // update search
        let searchResults = await getSearch(DisplayData.User.Profile.Songs.AvailableSongs, q, filterJson);
        // update search results
        document.getElementById("song-search-results").innerHTML = searchResults[0];
    });

    // trigger event
    searchBar.dispatchEvent(new Event("keyup"));

    Processlog.push(`Updated diplay in ${Date.now() - startTime}ms`);
    Processlog.push(`Finished in ${Date.now() - ProcessLogTotal}ms`);
    

};


// get element with id 'upload-file'
var uploadFile = document.getElementById('upload-file');
var uploadInfo = document.getElementById('upload-info');

async function checkPackage(files) {
    Processlog.push(`Checking Package Validity...`);
    let validPackage = true;
    const requiredFiles = [
        'readme.txt',
        'profile.json',
        'payment_stats.json',
        'payment_history.json',
    ]
    for (const requiredFile of requiredFiles) {
        if (!files.some((file) => file.name === requiredFile)) {
            validPackage = false;
            Processlog.push(`Missing ${requiredFile}`);
        }
        else {
            Processlog.push(`Found ${requiredFile}`);
        }
    }
    Processlog.push(`Package Validity: ${validPackage}`);
    return validPackage;
};

// handle file
async function handleFile(evt=null) {
    // get /api/songs.php
    songData = await fetch("/bdpe_data/api/songs.php").then((res) => res.json());

    uploadInfo.innerHTML = "<p style='color:orange;'>Checking Package Validity...</p>";
    // add timeout for 5 seconds
    var no_timeout = false;
    setTimeout(function(){ 
        if (no_timeout) return;
        Processlog.push(`Timed out while handling file... (handleFile)`);
        uploadInfo.innerHTML = "<p style='color:red;'>An error occured processing your file (handleFile), please try again or contact me on <a href='https://discord.gg/jAbuWshfG3' onclick='window.open(this.href); return false;'>discord</a>. (@foxboinick)</p>";
        // simclick
        let logo = document.getElementById('site-logo');
        logo.click();
        return;
    }, 10000);

    try {
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
        // if file.stream is undefined

        if (!file.stream) {
            loading = false;
            no_timeout = true;
            Processlog.push(`browser does not support streaming uploads...</p>`);
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

        Processlog.push(`Unpacked Zip File - ${files.length} files`);
        
        // check if package is valid
        const validPackage = await checkPackage(files);
    
        if (!validPackage) {
            loading = false;
            no_timeout = true;
            Processlog.push(`Package is not valid...`);
            uploadInfo.innerHTML = "<p style='color:red;'>Your package seems to be corrupted. Click or drop your package file here to retry</p>";
            return;
        }
    
        // update info
        Processlog.push(`Reading Files...`);
        uploadInfo.innerHTML = "<p style='color:green;'>Your package is valid! Reading Files...</p>";
    
        const getFile = (name) => files.find((file) => file.name === name);
    
        const readFile = async (name) => {
            Processlog.push(`Reading ${name}`);
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
    
        // create new data object
        var rawData = {};
        // for each file in package
        for (const file of files) {
            // get file name
            const fileName = file.name;
            // get file data
            const fileData = await readFile(fileName);
            // add file data to data object
            if (fileName.endsWith('.json')) {
                uploadInfo.innerHTML = `<p style='color:green;'>Your package is valid! Reading ${fileName}...</p>`;
                try{
                    rawData[fileName.replace('.json', '')] = JSON.parse(fileData);
                } catch (err) {
                    console.log(err);
                    loading = false;
                    no_timeout = true;

                    siteError = err.stack;
                    Processlog.push(`${fileName} is corrupted... (${err})`);
                    uploadInfo.innerHTML = "<p style='color:red;'>Your package seems to be corrupted. Click or drop your package file here to retry</p>";
                    no_timeout = true;
                    return;
                }
            } else {
                Processlog.push(`Skipping Non-JSON File: ${fileName}`);
                continue;
            }
        };

        // update info
        Processlog.push(`Processing Data...`);
        uploadInfo.innerHTML = "<p style='color:green;'>Your package is valid! Processing Data...</p>";
    
        // process data
        no_timeout = true;
        await processData(rawData);
    } catch (err) {
        no_timeout = true;
        loading = false;
        console.log(err);
        Processlog.push(`${err} (handleFile)`);
        siteError = err.stack;
        uploadInfo.innerHTML = `<p style='color:red;'>${err} (handleFile), please try again or contact me on <a href='https://discord.gg/jAbuWshfG3' onclick='window.open(this.href); return false;'>discord</a>. (@foxboinick)</p>`;
        // simclick
        let logo = document.getElementById('site-logo');
        logo.click();
        return;
    }
};

$(".beatscore-link-import").on('click', function(e){
    var Data = {
        Songs: ViewData.ProfileMap.Profile.Songs.AvailableSongs.map(function(s){
            return {
                SongVersionId: s.SongVersionId,
                MedalId: s.Score.MedalId
            }
        })
    };

    APICall("POST", "/api/account/usersong/bulk", Data)
    .then(function(){
        console.log("Scores updated");
    }).catch(function(err){
        console.log(err);
    })
})

$(".beatscore-link-login").on('click', function(e){
    $(".account-icon-btn").click();
    $("body").scrollTop(0);
})

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
    ProcessLogTotal = new Date();
    Processlog.push(`Opening from file dialog - ${evt.target.files.length} files`);
    uploadInfo.innerHTML = `<p style='color:orange;'>Opening from file dialog - ${evt.target.files.length} files</p>`;
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

    // get /api/songs.php
    songData = await fetch("/api/songs.php").then((res) => res.json());
    // process data
    let demo = await fetch('data/demo.json').then((res) => res.json());
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
