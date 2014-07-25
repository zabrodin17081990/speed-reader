var speedReader = {
    interval: 700,
    maxSymbolsCount: 25,
    fullText: '',
    fullTextWordsCount: 0,
    offset: 0,
    timerID: 0,
    start: function() {
        speedReader.fullText = $('#fullText').val();
        speedReader.fullText = speedReader.fullText.split(' ');
        speedReader.fullTextWordsCount = speedReader.fullText.length;
        speedReader.offset = 1;
        clearTimeout(speedReader.timerID);
        speedReader.tick();
        $('#interval').val(speedReader.interval);
        $('#offset').val(speedReader.offset);
        $('#maxSymbols').val(speedReader.maxSymbolsCount);
        $('#fullTextWordsCount').text(speedReader.fullTextWordsCount);
    },
    break: function() {
        if (speedReader.timerID) {
            clearTimeout(speedReader.timerID);
            speedReader.timerID = 0;
        } else {
            speedReader.tick();
        }
    },
    tick: function() {
        var partOfText = speedReader.fullText[speedReader.offset++] + ' ';
        while(speedReader.offset < speedReader.fullTextWordsCount) {
            if ((partOfText + speedReader.fullText[speedReader.offset]).length < speedReader.maxSymbolsCount) {
                partOfText += speedReader.fullText[speedReader.offset] + ' ';
                speedReader.offset++;
            } else {
                break;
            }
        }
        $('.work_space').text(partOfText);
        $('#offset').val(speedReader.offset);
        speedReader.timerID = setTimeout(speedReader.tick, speedReader.interval);
    },
    changeInterval: function() {
        speedReader.interval = $('#interval').val();
    },
    changeMaxSymbols: function() {
        speedReader.maxSymbolsCount = $('#maxSymbols').val();
    },
    changeOffset: function() {
        speedReader.offset = $('#offset').val();
    }
}

jQuery(function() {
	console.log('test');
    $('#startReader').click(speedReader.start);
    $('#breakReader').click(speedReader.break);
    $('#interval').change(speedReader.changeInterval);
    $('#offset').change(speedReader.changeOffset);
    $('#maxSymbols').change(speedReader.changeMaxSymbols);
});