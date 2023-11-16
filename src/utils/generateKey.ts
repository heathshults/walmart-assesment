

async function generateGUId() {
  const key = await crypto.randomUUID

  return key
}

async function generateAESKey() {
  const key = await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"],
  )

  return key
}

const keyGen ={
  guid: generateGUId, 
  aes: generateAESKey
}
export default keyGen
