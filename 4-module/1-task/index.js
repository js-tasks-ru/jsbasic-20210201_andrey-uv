function makeFriendsList(friends) {
  let ul = document.createElement("ul");

  friends.map(item => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(`${item.firstName} ${item.lastName}`));
    ul.appendChild(li);
  });

  return ul;
}
