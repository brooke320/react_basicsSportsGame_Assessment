class Team extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            shots: 0,
            score: 0
        }

        this.shotSound = new Audio('./assets/audio/BOUNCE+1.wav')
        this.scoreSound = new Audio('./assets/audio/BBOUNCE+2.wav')
    }

    shotHandler = () => {
        let score = this.state.score
        this.shotSound.play()
        
        if (Math.random() > 0.5) {
            score += 1

            setTimeout(() => {
                this.scoreSound.play()
            }, 100)
        }
       
        this.setState((state, props) => ({
           shots: state.shots + 1, 
           score
        }))
    }
    
    render() {
        let shotPercentageDiv

        if (this.state.shots) {
        const shotPercentage = Math.round((this.state.score / this.state.shots) * 100)
        shotPercentageDiv = (
            <div>
                    <strong>Shooting %: {shotPercentage}</strong>
            </div>
        )

    }

        return (
            <div className="Team">
                <h2>{this.props.name}</h2>

                <div className="identity">
                    <img src={this.props.logo} alt={this.props.name} />
                </div>

                <div>
                    <strong>Shots:</strong> {this.state.shots}
                </div>

                <div>
                    <strong>Score:</strong> {this.state.score}                     
                </div>

               {shotPercentageDiv}

                <button onClick={this.shotHandler}>Shoot!</button>
            </div>
        )
    }
}

function Game(props) {
    return (
        <div className="Game">
          <h1>Welcome to {props.venue}</h1>
          <div className="stats">
            <Team
                name={props.visitingTeam.name}
                logo={props.visitingTeam.logoSrc}
            />

          <div className="versus">
              <h1>VS</h1>
          </div>
           
            <Team
                name={props.homeTeam.name}
                logo={props.homeTeam.logoSrc}
            />
          </div>
        </div>
    )
}
// Deafault App component that all other components are rendered through
function App(props){
    const raccoons = {
        name: "Russiaville Raccons",
        logoSrc: "./assets/images/raccoon-player.jpg"  
    }

    const squirrels = {
        name: "Sheridan Squirrels",
        logoSrc: "./assets/images/squirrel-player.png" 
    }
    
    const bunnies = {
        name: "Burlington Bunnies",
        logoSrc: "./assets/images/bunny-player.jpg"
    }

    const hounds = {
        name: "Hammond Hounds",
        logoSrc: "./assets/images/hound-player.jpg"
    }

    return (
      <div className="App">
        <Game 
            venue="Union 525 Gem" 
            homeTeam={squirrels}
            visitingTeam={raccoons}
        />
        <Game 
            venue="Sheridan Arena"
            homeTeam={bunnies}
            visitingTeam={hounds} 
        />
      </div>
    )
  }
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );