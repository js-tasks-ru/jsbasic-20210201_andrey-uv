function toggleText() {
  let button = document.querySelector('.toggle-text-button');
  let toggleElement = document.querySelector('#text');

  button.onclick = () => toggleElement.hidden = !toggleElement.hidden;

  // INFO: Можна заюзать addEventListener, но у нас одно действие, лучше onclick как по мне.
}
