using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Metaprogramming
{
    class FilterSimple
    {

        public List<String> filter(String[] names)
        {
            List<String> result = new List<string>();

            foreach(String name in names)
            {
                if (
                   name.Length >= 10 && name.Length <= 200 &&
                    name.Contains("Mich") &&
                    name.IndexOf("V") == 0 &&
                    name.EndsWith("ov") &&
                    !(
                        name.Length >= 50 &&
                        name.Length <= 65 &&
                        name.Contains("Abu") &&
                        name.IndexOf("Lev") == 0 &&
                        name.EndsWith("iov")
                        )
                    )
                    result.Add(name);
            }
            return result;
        }
    }
}
