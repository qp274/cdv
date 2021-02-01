let data = [
    {
        "timestamp": "2021-01-30T09:57:26.775Z",
        "Zodiac Signs": 3,
        "mbti": 5,
        "feng shui/yi jing": 3,
        "Chinese zodiacs": 3,
        "karma In Buddhism": 3,
        "other": 3
    },
    {
        "timestamp": "2021-01-30T10:01:02.743Z",
        "Zodiac Signs": 2,
        "mbti": 1,
        "feng shui/yi jing": 1,
        "Chinese zodiacs": 2,
        "karma In Buddhism": 3,
        "other": 1
    },
    {
        "timestamp": "2021-01-30T10:01:45.593Z",
        "Zodiac Signs": 2,
        "mbti": 2,
        "feng shui/yi jing": 3,
        "Chinese zodiacs": 2,
        "karma In Buddhism": 3,
        "other": 2
    },
    {
        "timestamp": "2021-01-30T10:02:08.776Z",
        "Zodiac Signs": 2,
        "mbti": 2,
        "feng shui/yi jing": 2,
        "Chinese zodiacs": 2,
        "karma In Buddhism": 3,
        "other": 3
    },
    {
        "timestamp": "2021-01-30T10:13:10.753Z",
        "Zodiac Signs": 5,
        "mbti": 2,
        "feng shui/yi jing": 1,
        "Chinese zodiacs": 1,
        "karma In Buddhism": 1,
        "other": 1
    },
    {
        "timestamp": "2021-01-30T10:46:21.854Z",
        "Zodiac Signs": 1,
        "mbti": 1,
        "feng shui/yi jing": 4,
        "Chinese zodiacs": 3,
        "karma In Buddhism": 2,
        "other": 5
    },
    {
        "timestamp": "2021-01-30T12:23:02.789Z",
        "Zodiac Signs": 2,
        "mbti": 3,
        "feng shui/yi jing": 3,
        "Chinese zodiacs": 1,
        "karma In Buddhism": 2,
        "other": 2
    },
    {
        "timestamp": "2021-01-30T12:28:01.104Z",
        "Zodiac Signs": 1,
        "mbti": 1,
        "feng shui/yi jing": 5,
        "Chinese zodiacs": 1,
        "karma In Buddhism": 1,
        "other": 1
    },
    {
        "timestamp": "2021-01-30T12:28:36.298Z",
        "Zodiac Signs": 1,
        "mbti": 1,
        "feng shui/yi jing": 5,
        "Chinese zodiacs": 1,
        "karma In Buddhism": 5,
        "other": 2
    },
    {
        "timestamp": "2021-01-30T13:31:39.660Z",
        "Zodiac Signs": 4,
        "mbti": 3,
        "feng shui/yi jing": 3,
        "Chinese zodiacs": 3,
        "karma In Buddhism": 3,
        "other": 3
    },
    {
        "timestamp": "2021-01-30T16:59:49.312Z",
        "Zodiac Signs": 3,
        "mbti": 3,
        "feng shui/yi jing": 3,
        "Chinese zodiacs": 3,
        "karma In Buddhism": 3,
        "other": 3
    },
    {
        "timestamp": "2021-01-30T18:47:17.182Z",
        "Zodiac Signs": 1,
        "mbti": 1,
        "feng shui/yi jing": 1,
        "Chinese zodiacs": 1,
        "karma In Buddhism": 5,
        "other": 1
    },
    {
        "timestamp": "2021-01-31T12:07:31.407Z",
        "Zodiac Signs": 1,
        "mbti": 2,
        "feng shui/yi jing": 3,
        "Chinese zodiacs": 1,
        "karma In Buddhism": 1,
        "other": 4
    }
];

// the function dates a data
// arrayn as an argument
function averageData(data){
  // new empty array to be filled
  // with data in new structure
  let newData = [];
  // assuming each data point has the same
  // keys/categories, we extract an array of them from the
  // first data point in the array
  // in class we changed it to the last element instead
  // as the first one did not have all the categories filled out
  // there is more thorough ways to do this, but for out purposes
  // now, this will be enough
  let keys = Object.keys(data[0]);
  // now we loop over the keys/categories
  for(let i = 0; i < keys.length; i++){
    // store the current key/category in
    // a variable:
    let key = keys[i];
    // now we will loop over each data point
    // in the data set, check if it has a value
    // for the key/category and add them to
    // a total sum variable
    // as well as count the occurences in order to
    // calulate the averae in the end
    let sum = 0;
    let num = 0;
    for(let j = 0; j < data.length; j++){
      let datum = data[j];
      // check if the key exists
      // for this datapoint
      if(key in datum){
        // add to sum
        sum += datum[key];
        // increase count
        num++;
      }
    }
    // now calculate the average
    let avg = sum/num;
    // make sure the value is a number
    // (some value might be strings)
    if(!isNaN(avg)){
      // create an object with both the average
      // and also the number of measurements that
      // went into the average
      let newDataPoint = {"name": key, "average": avg, 'numMeasurements': num};
      // add the new datapoint to the new data array
      newData.push(newDataPoint);
    }
  }
  // return everything when it is done
  return newData;
}

let newdata = averageData(data);
console.log(newdata);



let back = document.getElementById('back');
for (i=1; i<= newdata.length; i++) {
  let bar = document.createElement('div');
  bar.className = 'backbar';
  bar.style.width = 5*80 + 'px';
  bar.innerHTML = '5';
  back.appendChild(bar);
}


// let wrapper = document.getElementById('wrapper');
// console.log('get');
// for (j=0; j<= newdata.length; j++) {
//   let bar = document.createElement('div');
//   bar.className = 'bar';
//   bar.style.width = 200 + 'px';
//   bar.innerHTML = newdata[j]['name'];
//   wrapper.appendChild(bar);
//   console.log('add')
// }

let digitwrapper = document.getElementById('digitwrapper');
for (i=0; i<= newdata.length; i++) {
  let bar = document.createElement('div');
  bar.className = 'invisiblebar ';
  bar.innerHTML =  newdata[i]['name']+'   '+newdata[i]['average'].toFixed(2);
  bar.style.width = newdata[i]['average']*80 + 'px';
  digitwrapper.appendChild(bar);
}
