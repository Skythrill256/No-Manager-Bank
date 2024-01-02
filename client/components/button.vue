<template>
  <div>
  <button @click= "connect" v-if = '!isConnected' class="flex bg-red-500" >Connect Wallet</button>
  <div v-else>
    <p>Wallet Connected to the address: {{accounts}}</p>
    <button @click= "disconnect" >Disconnect Wallet</button>
  </div>
  </div>
</template>

<script setup>
  import {ref} from 'vue';
  const isConnected = ref('false')
  const accounts = ref('')
  const connect = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      isConnected.value = true
      accounts.value = await window.ethereum.request({ method: 'eth_accounts' })
    } catch (error) {
      console.error(error)
    }
    const disconnect = async () =>{
      isConnected = false
      accounts = ''
    }
  }
</script>


