import { HomeView } from '../views/home.view';

export type HandleStartPlay = typeof HomeController.prototype.handleStartPlay;

export class HomeController {
    constructor(private session_id:string, private homeView:HomeView)
    {
        this.homeView.bindStartPlay(this.handleStartPlay);   
    }

    handleStartPlay = (mode: 'challenge' | 'singlePlay') => {
        const { origin, pathname } = location;
        if (mode==='challenge')
            location.replace(origin+pathname 
                + '?page=challenge&session_id='+this.session_id);
        else
            alert('Single player mode not yet implemented.')
    };
}
