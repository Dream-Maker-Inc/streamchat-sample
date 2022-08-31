import React, { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'
import { Chat, Channel, Window, ChannelHeader, MessageList, Thread, LoadingIndicator, MessageInput, ChannelList } from 'stream-chat-react'
import 'stream-chat-react/dist/css/index.css'

const apiKey = process.env.REACT_APP_STREAM_API_KEY

const user = {
  id: 'andy',
  name: 'andy',
  image: 'https://getstream.imgix.net/images/random_svg/FS.png'
}

export default function App() {
  const [client, setClient] = useState(null)

  useEffect(() => {
    async function init() {
      const chatClient = StreamChat.getInstance(apiKey)
      await chatClient.connectUser(user, chatClient.devToken(user.id))
      const channel = chatClient.channel('messaging', 'react-talk', {
        image: 'https://getstream.imgix.net/images/random_svg/FS.png',
        name: 'React!',
        members: [user.id]
      })

      await channel.watch()

      setClient(chatClient)
    }

    init()

    if (client) return () => client.disconnectUser()
  }, [])

  if (!client) return <LoadingIndicator />

  const filter = { members: { $in: ['andy'] } }

  return (
    <Chat client={client} theme="messaging light">
      <ChannelList filters={filter} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  )
}