(function() {
    'use strict';
    // Inject YouTube API script
    var tag = document.createElement('script');
    tag.src = '//www.youtube.com/player_api';

    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // DOM ready
    window.onYouTubePlayerAPIReady = function() {

        // Resize player accoding the windows width
        var resizePlayer = function() {
            playerOneYT.setSize( $window.width(), $window.height() );
            playerTwoYT.setSize( $window.width(), $window.height() );
        };

        var togglePlayers = function() {
            if(playerOneYT.getPlayerState() !== YT.PlayerState.PLAYING) {
                $body.addClass('videos-playing');
                playerTwoYT.playVideo();
            } else {
                $body.removeClass('videos-playing');
                playerTwoYT.pauseVideo();
            }
        };

        var YT = window.YT;
        // jQuery shorcuts
        var $body   = $('body');
        var $window = $(window);
        // Mains elements
        var playerOne   = document.getElementById('player-one');
        var playerTwo   = document.getElementById('player-two');
        var controlPlay = document.getElementById('control-play');
        // Players options
        var playersVars = {
            controls:0,
            showinfo:0,
            autohide:0,
            autoplay:0,
            modestbranding: 1,
            loop: 1
        };
        // Events bindings
        $(controlPlay).on('click', togglePlayers);
        // Resizes player
        $window.on('resize', resizePlayer);
        // Creates YT players
        // First player
        var playerOneYT = new YT.Player(playerOne, {
            videoId: '-mhgfXgwdls',
            height: '100%',
            width: $window.width(),
            playerVars: playersVars,
            events: {
                onReady: function() {
                    // Mutes one of the two videos
                    playerOneYT.mute();
                },
                onStateChange: function(event) {
                    if(event.data === YT.PlayerState.PLAYING) {
                        playerOneYT.seekTo( playerTwoYT.getCurrentTime() );
                    }
                }
            }
        });
        // Second player
        var playerTwoYT = new YT.Player(playerTwo, {
            videoId: 'axTSc3e6wu8',
            height: '100%',
            width: $window.width(),
            playerVars: playersVars,
            events: {
                onStateChange: function(event) {
                    if(event.data === YT.PlayerState.BUFFERING ) {
                        playerOneYT.pauseVideo();
                    } else if(event.data === YT.PlayerState.PLAYING) {
                        playerOneYT.playVideoAt( playerTwoYT.getCurrentTime() );
                        playerOneYT.playVideo();
                    } else if(event.data === YT.PlayerState.PAUSED) {
                        playerOneYT.pauseVideo();
                    }
                }
            }
        });
    };

})();
