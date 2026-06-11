using System;

class TestRunner {
    static void Main(string[] args) {
        string input = args.Length > 0 ? args[0] : "world";
        Console.WriteLine("Hello from .NET 3.5: " + input);
    }
}