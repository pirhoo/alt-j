(function() {
    // Inject YouTube API script
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // DOM ready
    window.onYouTubePlayerAPIReady = function() {

        // Resize player accoding the windows width
        var resizePlayer = function() {
            playerOneYT.setSize( $window.width(), $window.height() );
            playerTwoYT.setSize( $window.width(), $window.height() );
        }

        var togglePlayers = function() {
            //Videos synchronization
            playerOneYT.seekTo( playerTwoYT.getCurrentTime() );

            if( playerOneYT.getPlayerState() !== 1) {
                $videos.addClass("videos--playing");
                playerOneYT.playVideo();
                playerTwoYT.playVideo();
            } else {
                $videos.removeClass("videos--playing");
                playerTwoYT.pauseVideo();
                playerOneYT.pauseVideo();
            }
        }

        var startSynchronize = function() {
            playerSync = setInterval(function() {
                console.log(1);
            }, 1500);
        }

        // jQuery shorcuts
        var $videos = $(".videos")
        var $window = $(window)
        // Synchronize players with this interval
        var playerSync  = null;
        // Mains elements
        var playerOne   = document.getElementById("player-one");
        var playerTwo   = document.getElementById("player-two");
        var controlPlay = document.getElementById("control-play");
        // Players options
        var playersVars = {
            controls:0,
            showinfo:0,
            autohide:1,
            autoplay:1
        }
        // Events bindings
        $(controlPlay).on("click", togglePlayers);
        // Resizes player
        $window.on("resize", resizePlayer);
        // Creates YT players
        // First player
        var playerOneYT = new YT.Player(playerOne, {
            videoId: "-mhgfXgwdls",
            height: "100%",
            width: $window.width(),
            playerVars: playersVars,
            events: {
                onReady: function() {
                    playerOneYT.pauseVideo();
                    // Mutes one of the two videos
                    playerOneYT.mute();
                }
            }
        });
        // Second player
        var playerTwoYT = new YT.Player(playerTwo, {
            videoId: "axTSc3e6wu8",
            height: "100%",
            width: $window.width(),
            playerVars: playersVars,
            events: {
                onReady: function() {
                    playerTwoYT.pauseVideo();
                }
            }
        });
    }

})();
