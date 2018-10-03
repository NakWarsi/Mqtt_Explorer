using System;
using System.Text;
using System.Threading.Tasks;

using uPLibrary.Networking.M2Mqtt.Messages;

namespace ConsoleApp4
{
    class Publisher : Connection
    {
        public static async Task PublishMessageAsync()
        {
            await Task.Run(() =>
            {
                while (true)
                {
                    string sendmsg = Console.ReadLine();
                    client.Publish("client1",
                                    Encoding.UTF8.GetBytes(sendmsg),
                                    MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE,
                                    false);
                }
            });
        }
    }
}
