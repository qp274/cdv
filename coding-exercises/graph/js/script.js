let data = [
    {
        "timestamp": "2021-01-30T09:57:26.775Z",
        "zodiacSigns": 3,
        "mbtiMyersbriggsTypeIndicator": 5,
        "fengShuiyiJing": 3,
        "chineseZodiacSigns": 3,
        "karmaInBuddhismActionDrivenByIntentionLeadsToFutureConsequences": 3,
        "otherIDoTrustToSomeDegreeAPredictionSystemNotInTheList": 3
    },
    {
        "timestamp": "2021-01-30T10:01:02.743Z",
        "zodiacSigns": 2,
        "mbtiMyersbriggsTypeIndicator": 1,
        "fengShuiyiJing": 1,
        "chineseZodiacSigns": 2,
        "karmaInBuddhismActionDrivenByIntentionLeadsToFutureConsequences": 3
    },
    {
        "timestamp": "2021-01-30T10:01:45.593Z",
        "zodiacSigns": 2,
        "mbtiMyersbriggsTypeIndicator": 2,
        "fengShuiyiJing": 3,
        "chineseZodiacSigns": 2,
        "karmaInBuddhismActionDrivenByIntentionLeadsToFutureConsequences": 3,
        "otherIDoTrustToSomeDegreeAPredictionSystemNotInTheList": 2
    },
    {
        "timestamp": "2021-01-30T10:02:08.776Z",
        "zodiacSigns": 2,
        "mbtiMyersbriggsTypeIndicator": 2,
        "fengShuiyiJing": 2,
        "chineseZodiacSigns": 2,
        "karmaInBuddhismActionDrivenByIntentionLeadsToFutureConsequences": 3,
        "otherIDoTrustToSomeDegreeAPredictionSystemNotInTheList": 3
    },
    {
        "timestamp": "2021-01-30T10:13:10.753Z",
        "zodiacSigns": 5,
        "mbtiMyersbriggsTypeIndicator": 2,
        "fengShuiyiJing": 1,
        "chineseZodiacSigns": 1,
        "karmaInBuddhismActionDrivenByIntentionLeadsToFutureConsequences": 1,
        "otherIDoTrustToSomeDegreeAPredictionSystemNotInTheList": 1
    },
    {
        "timestamp": "2021-01-30T10:46:21.854Z",
        "zodiacSigns": 1,
        "mbtiMyersbriggsTypeIndicator": 1,
        "fengShuiyiJing": 4,
        "chineseZodiacSigns": 3,
        "karmaInBuddhismActionDrivenByIntentionLeadsToFutureConsequences": 2,
        "otherIDoTrustToSomeDegreeAPredictionSystemNotInTheList": 5
    },
    {
        "timestamp": "2021-01-30T12:23:02.789Z",
        "zodiacSigns": 2,
        "mbtiMyersbriggsTypeIndicator": 3,
        "fengShuiyiJing": 3,
        "chineseZodiacSigns": 1,
        "karmaInBuddhismActionDrivenByIntentionLeadsToFutureConsequences": 2,
        "otherIDoTrustToSomeDegreeAPredictionSystemNotInTheList": 2
    },
    {
        "timestamp": "2021-01-30T12:28:01.104Z",
        "zodiacSigns": 1,
        "mbtiMyersbriggsTypeIndicator": 1,
        "fengShuiyiJing": 5,
        "chineseZodiacSigns": 1,
        "karmaInBuddhismActionDrivenByIntentionLeadsToFutureConsequences": 1,
        "otherIDoTrustToSomeDegreeAPredictionSystemNotInTheList": 1
    },
    {
        "timestamp": "2021-01-30T12:28:36.298Z",
        "zodiacSigns": 1,
        "mbtiMyersbriggsTypeIndicator": 1,
        "fengShuiyiJing": 5,
        "chineseZodiacSigns": 1,
        "karmaInBuddhismActionDrivenByIntentionLeadsToFutureConsequences": 5,
        "otherIDoTrustToSomeDegreeAPredictionSystemNotInTheList": 2
    }
]

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

let wrapper = document.getElementById('wrapper');
for (i=0; i<= newdata.length; i++) {
  let bar = document.createElement('div');
  bar.className = 'bar';
  bar.innerHTML = newdata[i]['name'];
  bar.style.width = newdata[i]['average']*80 + 'px';
  wrapper.appendChild(bar);
}
