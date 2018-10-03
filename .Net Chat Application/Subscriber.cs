using System;
using System.Text;
using uPLibrary.Networking.M2Mqtt.Messages;


namespace ConsoleApp4
{
    class Subscriber : Connection
    {   
        public Subscriber()
        {
            ushort msgId = client.Subscribe(new string[] { "client2", "nak" },
                                new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE,
                                            MqttMsgBase.QOS_LEVEL_AT_LEAST_ONCE });
            client.MqttMsgPublishReceived += client_MqttMsgPublishReceived;
        }

        private void client_MqttMsgPublishReceived(object sender, MqttMsgPublishEventArgs e)
        {
            Console.WriteLine("client2: " + Encoding.UTF8.GetString(e.Message));
        }
        
    }
}
