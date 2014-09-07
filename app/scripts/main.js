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
            //Videos synchronization
            playerOneYT.seekTo( playerTwoYT.getCurrentTime() );

            if( playerOneYT.getPlayerState() !== 1) {
                $body.addClass('videos-playing');
                playerOneYT.playVideo();
                playerTwoYT.playVideo();
            } else {
                $body.removeClass('videos-playing');
                playerTwoYT.pauseVideo();
                playerOneYT.pauseVideo();
            }
        };

        // jQuery shorcuts
        var $videos = $('.videos');
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
            autohide:1,
            autoplay:1
        };
        // Events bindings
        $(controlPlay).on('click', togglePlayers);
        // Resizes player
        $window.on('resize', resizePlayer);
        // Creates YT players
        // First player
        var playerOneYT = new window.YT.Player(playerOne, {
            videoId: '-mhgfXgwdls',
            height: '100%',
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
        var playerTwoYT = new window.YT.Player(playerTwo, {
            videoId: 'axTSc3e6wu8',
            height: '100%',
            width: $window.width(),
            playerVars: playersVars,
            events: {
                onReady: function() {
                    playerTwoYT.pauseVideo();
                }
            }
        });
    };

})();
