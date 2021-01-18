/** Incrememnt this if you want to reset the ad state on the client. this will cause them to see ads for matching game types first.
 * I suggest incrementing it everytime you swap out the ads. */
window.adLineupVersion = 42;

// 1) do we need a way to plug special entries?
// 2) do we always want certain 247 ones plugged first?

/** Set the actual ad data here 
 * gameType: the type of the game that the ad is for, these value MUST match values in the gamesite's code, do not change them
 * imageURL: fully qualified path to the featured ad  image
 * linkURL: the fully qualified url, with variables, that you want the ad to href
 */
window.adLineup = (function() {

	// EXAMPLE
	//{
	//	"gameType": "solitaire",
	//	"imageURL": imageBaseURL + "solitaire_spring_landscape.jpg",
	//	"linkURL": "http://www.springsolitaire.com" + linkURLVariables
	//},

	var imageBaseURL = "https://www.247games.com/feature-lineup/promos/";		/* This should be an abosolute url */
	var linkURLVariables = "?promo=1";											/* args appended to the link for tracking purposes */

	// Must be sorted in desired order of showing
	var games = [
		{ id: "solitaire",		key: "solitaire",	url: "https://www.247solitaire.com/" },
		{ id: "mahjong",		key: "mahjong",		url: "https://www.247mahjong.com/"},
		{ id: "sudoku",			key: "sudoku",		url: "https://www.247sudoku.com/" },
		{ id: "backgammon",		key: "backgammon",	url: "https://www.247backgammon.org/" },
		{ id: "blackjack",		key: "blackjack",	url: "https://www.247blackjack.com/" },
		{ id: "hearts",			key: "hearts",		url: "https://www.247hearts.com/" },
		{ id: "bridge",			key: "bridge",		url: "https://www.247bridge.com/" },
		{ id: "spades",			key: "spades",		url: "https://www.247spades.com/" },
		{ id: "checkers",		key: "checkers",	url: "https://www.247checkers.com/" },
		{ id: "chess",			key: "chess",		url: "https://www.247chess.com/" },
		{ id: "roulette",		key: "roulette",	url: "https://www.247roulette.org/" },
		{ id: "slots",			key: "slots",		url: "https://www.247slots.org/" },
		{ id: "video-poker",	key: "videopoker",	url: "https://www.247videopoker.org/" },
		{ id: "poker",			key: "poker",		url: "https://www.247freepoker.com/" }
	];

	// Must be sorted by date
	var themes = [
		{ id: "winter",			month: 1,	day: 2,		key: "winter" },
		{ id: "valentines",		month: 2,	day: 2,		key: "valentine" },
		{ id: "st-patricks",	month: 2,	day: 17,	key: "stpatty" },
		{ id: "easter",			month: 3,	day: 18,	key: "easter" },
		{ id: "cinco-de-mayo",	month: 4,	day: 26,	key: "cinco" },
		{ id: "spring",			month: 5,	day: 6,		key: "spring" },
		{ id: "4th-of-july",	month: 6,	day: 1,		key: "4thofjuly" },
		{ id: "summer",			month: 7,	day: 5,		key: "summer" },
		{ id: "247",			month: 8,	day: 5,		key: "247" },
		{ id: "fall",			month: 9,	day: 5,		key: "fall" },
		{ id: "halloween",		month: 10,	day: 1,		key: "halloween" },
		{ id: "thanksgiving",	month: 11,	day: 4,		key: "thanksgiving" },
		{ id: "christmas",		month: 12,	day: 1,		key: "christmas" },
		{ id: "new-years",		month: 12,	day: 26,	key: "newyears" }
	];

	// URL overrides for non merged sites
	var urlOverrides = {};
	urlOverrides["solitaire:winter"] = "http://www.wintersolitaire.com/";
	urlOverrides["solitaire:valentines"] = "http://www.valentinesdaysolitaire.com/";
	urlOverrides["solitaire:st-patricks"] = "http://www.stpatricksdaysolitaire.com/";
	urlOverrides["solitaire:easter"] = "http://www.solitaireeaster.com/";
	urlOverrides["solitaire:cinco-de-mayo"] = "http://www.cincodemayosolitaire.com/";
	urlOverrides["solitaire:spring"] = "http://www.springsolitaire.com/";
	urlOverrides["solitaire:4th-of-july"] = "http://www.4thofjulysolitaire.com/";
	urlOverrides["solitaire:summer"] = "http://www.solitairesummer.com/";
	urlOverrides["solitaire:fall"] = "http://www.fallsolitaire.com/";
	urlOverrides["solitaire:halloween"] = "http://www.solitairehalloween.com/";
	urlOverrides["solitaire:thanksgiving"] = "http://www.thanksgivingsolitaire.com/";
	urlOverrides["solitaire:christmas"] = "http://www.christmas-solitaire.com/";
	urlOverrides["solitaire:new-years"] = "http://www.newyearssolitaire.com/";
	urlOverrides["mahjong:winter"] = "http://www.wintermahjong.com/";
	urlOverrides["mahjong:valentines"] = "http://www.valentinesdaymahjong.com/";
	urlOverrides["mahjong:st-patricks"] = "http://www.stpatricksdaymahjong.com/";
	urlOverrides["mahjong:easter"] = "http://www.mahjongeaster.com/";
	urlOverrides["mahjong:cinco-de-mayo"] = "http://www.cincodemayomahjong.com/";
	urlOverrides["mahjong:spring"] = "http://www.springmahjong.com/";
	urlOverrides["mahjong:4th-of-july"] = "http://www.4thofjulymahjong.com/";
	urlOverrides["mahjong:summer"] = "http://www.summermahjong.com/";
	urlOverrides["mahjong:fall"] = "http://www.fallmahjong.com/";
	urlOverrides["mahjong:halloween"] = "http://www.halloween-mahjong.com/";
	urlOverrides["mahjong:thanksgiving"] = "http://www.thanksgivingmahjong.com/";
	urlOverrides["mahjong:christmas"] = "http://www.christmas-mahjong.com/";
	urlOverrides["mahjong:new-years"] = "http://www.newyearsmahjong.com/";

	// Pick which theme to use
	var now = new Date();
	var month = now.getMonth() + 1;	// 0 indexed
	var day = now.getDate();

	if (window.overrideMonth) month = window.overrideMonth;
	if (window.overrideDay) day = window.overrideDay;

	var theme = themes[themes.length - 1];
	for (var i = 0; i < themes.length; ++i)
	{
		if (themes[i].month > month)
		{
			break;
		}
		else if (themes[i].month === month)
		{
			if (themes[i].day > day)
			{
				break;
			}
		}
		theme = themes[i];
	}

	// Build the lineup
	var lineup = [];
	for (var i = 0; i < games.length; ++i)
	{
		var game = games[i];

		var entry = {
			gameType: game.id,
			theme: theme.id,
			imageURL: imageBaseURL + game.key + "_" + theme.key + "_landscape.jpg",
			linkURL: ""
		};

		var urlOverrideKey = game.id + ":" + theme.id;
		if (urlOverrides[urlOverrideKey])
		{
			entry.linkURL = urlOverrides[urlOverrideKey] + linkURLVariables;
		}
		else if (theme.id === "247")
		{
			entry.linkURL = game.url + linkURLVariables;
		}
		else
		{
			entry.linkURL = game.url + theme.id + "/" + linkURLVariables;
		}

		lineup.push(entry);
	}

	// Add in appended entries
	if (theme.id !== "247")
	{
		lineup.push({
			gameType: "solitaire",
			theme: "247",
			imageURL: imageBaseURL + "solitaire_247_landscape.jpg",
			linkURL: "https://www.247solitaire.com/" + linkURLVariables
		});
		lineup.push({
			gameType: "mahjong",
			theme: "247",
			imageURL: imageBaseURL + "mahjong_247_landscape.jpg",
			linkURL: "https://www.247mahjong.com/" + linkURLVariables
		});
		lineup.push({
			gameType: "sudoku",
			theme: "247",
			imageURL: imageBaseURL + "sudoku_247_landscape.jpg",
			linkURL: "https://www.247sudoku.com/" + linkURLVariables
		});
	}

	// Return the lineup
	return lineup;
})();
