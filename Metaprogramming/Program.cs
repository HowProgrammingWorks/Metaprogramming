using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Metaprogramming
{
    class Program
    {
        private static String[] names =
        {
            "Marcus Aurelius Antoninus Augustus",
            "Darth Vader",
            "Victor Michailovich Glushkov",
            "Victor Michailovich Glushkov1",
            "Gottfried Wilhelm von Leibniz",
            "Mao Zedong",
            "Vladimir Sergeevich Soloviov",
            "Ibn Arabi",
            "Lev Nikolayevich Tolstoy",
            "Muammar Muhammad Abu Minyar al-Gaddafi",
            "Rene Descartes",
            "Fyodor Mikhailovich Dostoyevsky",
            "Benedito de Espinosa"
        };
        static void Main(string[] args)
        {
            new FilterSimple().filter(names).ForEach(delegate (String name)
            {
                Console.WriteLine(name);
            });
            new Metaprogramming().filter(names.ToList<String>()).ForEach(delegate (String name)
            {
                Console.WriteLine(name);
            });
            Console.ReadKey();
        }
    }
}
