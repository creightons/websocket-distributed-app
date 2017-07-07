const BAD_REQUEST = new Error('Bad Request');

function ajax(method, url) {
    fetch(url, {
        method,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => {
            if (!res.ok) { throw BAD_REQUEST; }
            return res;
        })
        .then(res => res.json())
        .then(data => {
            console.log('success', data);
        })
        .catch(err => console.log(err));
}

function POST(url) { ajax('POST', url); }

document.querySelector('#send-button')
    .addEventListener('click', () => POST('/send-message'));
