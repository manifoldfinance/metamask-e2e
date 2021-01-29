
// Modules
import MetaMaskOnboarding from '@metamask/onboarding'
import { isMetaMaskConnected, getAccounts } from './modules/BasicActions'
// // Basic Actions Section
const connectButton = document.getElementById('connectButton')
const onboardingButton = document.getElementById('onboardingInProgressButton')
// const getAccountsButton = document.getElementById('getAccounts')
// const getAccountsResults = document.getElementById('getAccountsResult')

const { isMetaMaskInstalled } = MetaMaskOnboarding

const currentUrl = new URL(window.location.href)
const forwarderOrigin = currentUrl.hostname === 'localhost' ? 'http://localhost:9010' : undefined

const onboarding = new MetaMaskOnboarding({ forwarderOrigin })
let accounts

onboardingButton.addEventListener('click', () => {
  location.reload()
})

const onClickInstall = () => {
  connectButton.style.display = 'none'
  onboardingButton.style.display = 'block'
  onboarding.startOnboarding()
}

const metaMaskCheck = () => {
  if (!isMetaMaskInstalled) {
    onboardingButton.innerText = 'Click here to install MetaMask!'
    onboardingButton.onclick = onClickInstall
    onboardingButton.disabled = false
  } else if (isMetaMaskConnected()) {
    accounts = getAccounts()
    connectButton.innerText = 'Connected'
    connectButton.disabled = true
    onboardingButton.disabled = false
  } else {
    onboardingButton.innerText = 'Connect'
    onboardingButton.onclick = getAccounts
    onboardingButton.disabled = false
  }
}


const initialize = async () => {
  onboardingButton.style.display = 'none'
  console.log(accounts)
  if (!isMetaMaskInstalled()) {
    connectButton.innerText = 'Click here to install MetaMask!'
    connectButton.onclick = onClickInstall
    connectButton.disabled = false
  } else if (isMetaMaskConnected(accounts)) {
    connectButton.disabled = true
    if (onboarding) {
      onboarding.stopOnboarding()
    }
  } else {
    connectButton.onclick = getAccounts
    connectButton.disabled = false
  }

  metaMaskCheck()
}

window.addEventListener('DOMContentLoaded', initialize)
