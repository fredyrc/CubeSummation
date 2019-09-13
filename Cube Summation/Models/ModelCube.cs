using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cube_Summation.Models
{
    public class ModelCube
    {
        private Dictionary<string,int> Cube;

        public ModelCube(int lenght)
        {
            Cube = new Dictionary<string, int>(lenght);
            
            for(int x=1;x<=lenght;x++)
            {
                for (int y = 1; y <= lenght; y++)
                {
                    for (int z = 1; z <= lenght; z++)
                    {
                        Cube.Add(x.ToString()+','+y.ToString()+','+z.ToString(),0);
                    }
                }
            }

        }

        public bool UpdateCube(ModelUpdate coor)
        {
            if(Cube.ContainsKey(coor.X+","+coor.Y+","+coor.Z))
            {
                Cube[coor.X + "," + coor.Y + "," + coor.Z] = coor.W;
                return true;
            }

            return false;
        }

        public int QueryCube(ModelQuery query)
        {
            int result = 0;
            for (int x = query.x1; x <= query.x2; x++)
            {
                for (int y=query.y1; y <= query.y2; y++)
                {
                    for (int z = query.z1; z <= query.z2; z++)
                    {
                        result += Cube[x + "," + y + "," + z];
                    }
                }
            }

            return result;

        }
    }

    public static class CurrentCube
    {
        public static Dictionary<int, ModelCube> ListCube = new Dictionary<int, ModelCube>();
    }
}