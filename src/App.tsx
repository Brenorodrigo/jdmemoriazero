import { useEffect, useState } from 'react';
import * as C from './App.styles';

import LogoImg from './assets/devmemory_logo.png';
import { Button } from './components/Button';
import { InfoItem } from './components/InfoItem';
import { items } from './data/items';
import { GridItem } from './components/GridItem';
import { GridItemType } from './types/GridItemType';
import RestartIcon from './svgs/restart.svg';


const Aplic = () => {

  const [playng, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElased] = useState<number>(0);
  const [moveCount, setMoveCount ] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [girdItems, setGridItems] = useState<GridItemType[]>([]);



  useEffect(() => resetAndCreate(),[]);

  const resetAndCreate = () =>{

    // resetar o jogo de início
    setTimeElased(0);
    setMoveCount(0);
    setShownCount(0);
    
    
    //passo 2 - criar o Grid
    //passp 2.1 criar o gridvazio

     let tmpGrid:GridItemType[] = [];
     for(let i = 0; i <(items.length * 2); i++) tmpGrid.push({
         item: null, shown:false, permanentsShown:false
     });    

     // 2.2 - preencher o drid

     for (let w = 0; w < 2; w++){
       for(let i = 0; i < items.length; i++){
         let pos = -1;
         while(pos || tmpGrid[pos].item !==null){
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item =i;
       }
     }


     // 2.3 jogar no state
     setGridItems(tmpGrid);

     // passo 3
     setPlaying(true);

  }

  const handleItemClick= (index:number) =>{
    
  }

  return(
    <C.Container>
      <C.Info>

        <C.LogoLink>
          <img src={LogoImg} alt="" width={200} />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label='Tempo' value='00:00'/>
          <InfoItem  label='Movimentos' value='0'/>
        </C.InfoArea>
          <Button label='Reiniciar' icon={RestartIcon } onClick={resetAndCreate}/>
      </C.Info>

      <C.GridArea>
        <C.Grid>
          {girdItems.map((item,index) =>(
              <GridItem
                key={index}
                item={item}
                onClick={() => handleItemClick(index)}
              
              />
          ))}
        </C.Grid>
      </C.GridArea>

    </C.Container>
    
  );
}
export default Aplic;