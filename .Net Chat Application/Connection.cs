using System;
using uPLibrary.Networking.M2Mqtt;

namespace ConsoleApp4
{
    class Connection
    {
        public static string BrokerAddress = "localhost";
        public static MqttClient client = new MqttClient(BrokerAddress);
        public static String clientId = Guid.NewGuid().ToString();
        public Connection() {

            client.Connect(clientId);
            Console.WriteLine("connected to broker");
        }


    }
}
