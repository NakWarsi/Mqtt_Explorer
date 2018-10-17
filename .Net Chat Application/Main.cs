using System;

namespace ConsoleApp4
{
    class Program
    {
        static void Main(string[] args)
        {
            Subscriber sub = new Subscriber();
            Publisher.PublishMessageAsync();
            Console.WriteLine("Reached the end of the Main Thread");
            //sub.subPrint();
        }
    }
}
