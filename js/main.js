var pusher,
    channel,
    apiToken = '0f97ee0eb0dba4f1d8fb',
    api = 'https://salty-temple-56361.herokuapp.com/posts'

// Pusher connection
pusher = new Pusher(apiToken, {
  encrypted: true
})

// Pusher channel and event subscription
channel = pusher.subscribe('posts')
channel.bind('new_photo', function(data) {
  // Put your code here to render incoming photos
  renderPhoto(data)
})

fetch(api)
  .then(function(data) {
    return data.json()
  })
  .then(function(photos) {
    // Put your code here to render existing photos
    photos.forEach(function(photo){
      renderPhoto(photo)
    })
  })

function renderPhoto(photoObject) {
  var photos = document.getElementById('photos'),
    card = document.createElement('div'),
    expander = document.createElement('div'),
    caption = document.createElement('div')
    text = document.createElement('span')

  // Build the container
  card.classList.add('image-card', 'mdl-card', 'mdl-shadow--2dp', 'mdl-cell', 'mdl-cell--4-col')
  expander.classList.add('mdl-card__title', 'mdl-card--expand')
  caption.classList.add('mdl-card__actions')

  // Build the image
  card.style.backgroundImage = "url(" + photoObject.image + ")"

  // Build the caption
  text.classList.add('caption')
  text.innerHTML = photoObject.caption

  // Add the image and caption to the container
  caption.appendChild(text)
  card.appendChild(expander)
  card.appendChild(caption)

  // Add the container to the page
  photos.appendChild(card)

  updateChartArray(photoObject.created_at)
}


// CHART TIME
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [{
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: [
                'rgba(76,175,80,0.2)',
            ],
            borderColor: [
                'rgb(76,175,80)',
            ],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: {
          display: false
        },
        title: {
          display: true,
          text: "Number of Uploads Per Month"
        },
    }
});

function updateChartArray(timestamp) {
  var month = moment(timestamp).format('MMMM'),
    data = myChart.data.datasets[0].data

  if (month === 'January') {
    data[0] += 1
  }
  else if (month === 'February') {
    data[1] += 1
  }
  else if (month === 'March') {
    data[2] += 1
  }
  else if (month === 'April') {
    data[3] += 1
  }
  else if (month === 'May') {
    data[4] += 1
  }
  else if (month === 'June') {
    data[5] += 1
  }
  else if (month === 'July') {
    data[6] += 1
  }
  else if (month === 'August') {
    data[7] += 1
  }
  else if (month === 'September') {
    data[8] += 1
  }
  else if (month === 'October') {
    data[9] += 1
  }
  else if (month === 'November') {
    data[10] += 1
  }
  else if (month === 'December') {
    data[11] += 1
  }

  myChart.update()
}
