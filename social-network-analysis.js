/* data provided to the Assignment */
var data = {
  f01: {
    name: "Alice",
    age: 15,
    follows: ["f02", "f03", "f04"]
  },
  f02: {
    name: "Bob",
    age: 20,
    follows: ["f05", "f06"]
  },
  f03: {
    name: "Charlie",
    age: 35,
    follows: ["f01", "f04", "f06"]
  },
  f04: {
    name: "Debbie",
    age: 40,
    follows: ["f01", "f02", "f03", "f05", "f06"]
  },
  f05: {
    name: "Elizabeth",
    age: 45,
    follows: ["f04"]
  },
  f06: {
    name: "Finn",
    age: 25,
    follows: ["f05"]
  }


}

/* end of data provided to the Assignment */

/*
tasks:

    List everyone and for each of them, list the names of who they follow and who follows them  (/)
    Identify who follows the most people                                                        (/)
    Identify who has the most followers                                                         (/)
    Identify who has the most followers over 30                                                 (/)
    Identify who follows the most people over 30                                                (/)
    List those who follow someone that doesn't follow them back                                 (/)
    List everyone and their reach (sum of # of followers and # of followers of followers)       (x)
*/
/* test calls */
let person = getPersonByKey("f06");
console.log(person);
console.log(getNameByKey("f06"));
console.log(getFollowesNames(person));
console.log(getFolloversNameByKey("f06"));
console.log();



printEveryoneWithFolloversAndFollows();
whoFollowsTheMost();
whoHasTheMostFollowers();
whoHasTheMostFollowersOver30();
whoFollowsTheMostOver30();
whoFollowsWithoutBeingFollowed()
/* helper functions */
function getPersonByKey(key){
  return data[key];
}

function getNameByKey(key){
  return getPersonByKey(key).name;
}

function getFollowesNames(person){
  let follows = [];
  for(let followsKey of person.follows){
    follows.push(getNameByKey(followsKey));
  }
  return follows;
}

function getFollowersByKey(key){
  let followers = [];
  for(let personKey in data){
    let nextPerson = getPersonByKey(personKey);
    if(nextPerson.follows.includes(key)){
      followers.push(nextPerson);
    }
  }
  return followers;
}

function getFollowersKeyByKey(key){
  let followers = [];
  for(let personKey in data){
    let nextPerson = getPersonByKey(personKey);
    if(nextPerson.follows.includes(key)){
      followers.push(personKey);
    }
  }
  return followers;
}

function getFolloversNameByKey(key){
  let followers = [];
  for(let personKey in data){
    let nextPerson = getPersonByKey(personKey);
    if(nextPerson.follows.includes(key)){
      followers.push(nextPerson.name);
    }
  }
  return followers;
}

function isOlderThan(personKey, age){
  return getPersonByKey().age >= age;
}

function followsWithoutBeingFollowed(personKey){
  let person = getPersonByKey(personKey);
  for (key of person.follows ){
    if ( !getPersonByKey(key).follows.includes(personKey) ){
      return true;
    }
  }
  return false;
}
/* end helper functions */

function printEveryoneWithFolloversAndFollows(){
  for(let personKey in data){
    let person = getPersonByKey(personKey);
    console.log(person.name, " follows: " + getFollowesNames(person), "followed by: " + getFolloversNameByKey(personKey));
  }
}

function whoFollowsTheMost(){
  let max = -1;
  let name = "";
  for(let personKey in data){
    let person = getPersonByKey(personKey);
    if(person.follows.length === max){
      name += " and " + person.name;
    }
    else if(person.follows.length > max){
      max = person.follows.length;
      name = person.name;
    }
  }
  console.log(name + " follows the most number of people with the value of " + max);
}

function whoHasTheMostFollowers(){
  let max = -1;
  let name = "";
  for(let personKey in data){
    let person = getPersonByKey(personKey);
    let followers = getFollowersByKey(personKey);
    if(followers.length === max){
      name += " and " + person.name;
    }
    else if(followers.length > max){
      max = followers.length;
      name = person.name;
    }
  }
  console.log(name + " has the most followers with the value of " + max);
}


function whoHasTheMostFollowersOver30(){
  let max = -1;
  let name = "";
  for(let personKey in data){
    let person = getPersonByKey(personKey);
    let arr = getFollowersByKey(personKey);
    let followersOver30 = arr.filter(
                          function(item){
                            return item.age > 30;
    });
    if(followersOver30.length === max){
      name += " and " + person.name;
    }
    else if(followersOver30.length > max){
      max = followersOver30.length;
      name = person.name;
    }
  }
  console.log(name + " has the most followers over 30 with the value of " + max);
}


function whoFollowsTheMostOver30(){
  let max = -1;
  let name = "";
  for(let personKey in data){
    let person = getPersonByKey(personKey);
    let followsOver30 = person.follows.filter(
                          function(personKey){
                            return getPersonByKey(personKey).age > 30;
    });
    if(followsOver30.length === max){
      name += " and " + person.name;
    }
    else if(followsOver30.length > max){
      max = followsOver30.length;
      name = person.name;
    }
  }
  console.log(name + " follows the most number of old people with the value of " + max);
}

function whoFollowsWithoutBeingFollowed(){
  let res = [];
  for(let personKey in data){
    if (followsWithoutBeingFollowed(personKey)){
      res.push(getNameByKey(personKey));
    }
  }
  console.log("The people who follows others without being followed by them : ", res);
}

function printReach(){
  for( let personKey in data){
    let person = getPersonByKey(personKey);
    let reach = getFollowersKeyByKey(personKey);
    let secondReach = [];
    for( followerKey of reach){
      getFollowersKeyByKey(followerKey).forEach(function(next){
                                                  if(next !== personKey)
                                                    secondReach.push(next)
                                                });

    }
    for ( secondReachKey of secondReach ){
      if (! reach.includes(secondReachKey)){
        reach.push(secondReachKey);
      }
    }
    console.log(reach, person.name + " reach is " + reach.length);
  }
}

printReach();