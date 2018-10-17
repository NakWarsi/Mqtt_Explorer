using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using uPLibrary.Networking.M2Mqtt.Messages;
using uPLibrary.Networking.M2Mqtt;
using System.ComponentModel;

namespace WpfApp4
{
    class Chat : INotifyPropertyChanged
    {
        public static string BrokerAddress = "localhost";
        public static MqttClient client = new MqttClient(BrokerAddress);
        public static String clientId = Guid.NewGuid().ToString();

        String msg = "bababa banana";

        public Chat()
        {
            client.Connect(clientId);
            Console.WriteLine("connected to broker");


            ushort msgId = client.Subscribe(
                new string[] { "#", "nak" },
                new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE,
                MqttMsgBase.QOS_LEVEL_AT_LEAST_ONCE });

            client.MqttMsgPublishReceived += client_MqttMsgPublishReceived;
            //    message= "hello i am message to get displayed";
        }


        public string message
        {
            get
            {
                return msg;
            }
            set
            {
                msg = value;
                OnPropertyRaised("message");
            }
        }

        private void client_MqttMsgPublishReceived(object sender, MqttMsgPublishEventArgs e)
        {
            Console.WriteLine("i am here in printing");
            Console.WriteLine(Encoding.UTF8.GetString(e.Message));
            message += Encoding.UTF8.GetString(e.Message) + "\n";
        }

        private void OnPropertyRaised(string propertyname)
        {
            if (PropertyChanged != null)
            {
                PropertyChanged(this, new PropertyChangedEventArgs(propertyname));
            }
        }
        public event PropertyChangedEventHandler PropertyChanged;




    }
}
