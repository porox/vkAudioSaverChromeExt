
function getAudiosArray()
{
    var elements = document.getElementsByClassName("audio_row");
    var arr = [];
    var i = 0;
    return Array.prototype.forEach.call(elements, function(el) {
        if (!el.classList.contains('dowloaded'))
        {
            arr.push(el.getAttribute('data-full-id'));
            i++;
            if (i == 9){
                i = 0;
                getAudiosUrls(arr);
                arr = [];
            }
        }
    });
}

function getAudiosUrls(arr)
{
    ajax.post('al_audio.php', {
        act: 'reload_audio',
        ids: arr.join(',')
    }, {
        onDone: function (i, a, s) {
            renderDownloadButton(i);
        }
    })
}

function renderDownloadButton(arr)
{
    var url;
    for (var audio in arr)
    {
        document.getElementsByClassName('_audio_row_'+arr[audio][1]+'_'+arr[audio][0])[0].className += ' dowloaded';
        var element = document.getElementsByClassName('_audio_row_'+arr[audio][1]+'_'+arr[audio][0])[0]
            .getElementsByClassName('audio_row_content')[0]
            .getElementsByClassName('audio_row__inner')[0]
            .getElementsByClassName('audio_row__performer_title')[0]
            .getElementsByClassName('audio_row__title');
        url = unpackAudioUrl(arr[audio][2]);
        var a = document.createElement('a');
        a.href=url;
        a.title='DOWNLOAD';
        a.download = arr[audio][4]+'.mp3';
        var linkText = document.createTextNode("  DOWNLOAD");
        a.appendChild(document.createElement('br'));
        a.appendChild(linkText);

        a.className = 'audio_row__title_inner';
        element[0].appendChild(a);

    }
}
function unpackAudioUrl(t) {
    if (~t.indexOf('audio_api_unavailable')) {
        var e = t.split('?extra=') [1].split('#'),
            o = a(e[1]);
        e = a(e[0]);
        o = o.split(String.fromCharCode(9));

        for (var s, r, n = o.length; n--; ) {
            r = o[n].split(String.fromCharCode(11));
            s = r.splice(0, 1, e) [0];
            e = l[s].apply(null, r)
        }
        if (e && 'http' === e.substr(0, 4)) return e

    }
    return t
}
function a(t) {
    if (!t || t.length % 4 == 1) return !1;
    for (var e, i, o = 0, a = 0, s = ''; i = t.charAt(a++); ) i = r.indexOf(i),
    ~i && (e = o % 4 ? 64 * e + i : i, o++ % 4) && (s += String.fromCharCode(255 & e >> ( - 2 * o & 6)));
    return s
}
function s(t, e) {
    var i = t.length,
        o = [
        ];
    if (i) {
        var a = i;
        for (e = Math.abs(e); a--; ) o[a] = (e += e * (a + i) / e) % i | 0
    }
    return o
}

var r = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=',
    l = {
        v: function (t) {
            return t.split('').reverse().join('')
        },
        r: function (t, e) {
            t = t.split('');
            for (var i, o = r + r, a = t.length; a--; ) i = o.indexOf(t[a]),
            ~i && (t[a] = o.substr(i - e, 1));
            return t.join('')
        },
        s: function (t, e) {
            var i = t.length;
            if (i) {
                var o = s(t, e),
                    a = 0;
                for (t = t.split(''); ++a < i; ) t[a] = t.splice(o[i - 1 - a], 1, t[a]) [0];
                t = t.join('')
            }
            return t
        },
        x: function (t, e) {
            var i = [
            ];
            return e = e.charCodeAt(0),
                each(t.split(''), function (t, o) {
                    i.push(String.fromCharCode(o.charCodeAt(0) ^ e))
                }),
                i.join('')
        }
    };
