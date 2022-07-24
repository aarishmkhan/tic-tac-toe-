import { RecoilRoot } from 'recoil'
import Game from './components/game';


export default function Home(){
  return (
    <RecoilRoot>
      <body>
        <h1 className="heading">Tic-Tac-Toe</h1>
        <div>
          <Game />
        </div>
      </body>
    </RecoilRoot>
    
  );
}


