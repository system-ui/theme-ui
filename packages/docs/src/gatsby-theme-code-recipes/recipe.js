import { Link } from 'gatsby'

export default function RecipeLink(props) {
  return (
    <div>
      <div
        sx={{
          fontWeight: 'bold',
          mb: 3,
        }}
      >
        <Link sx={(t) => t.styles.a} to="/recipes">
          Recipes
        </Link>
        {' / '}
        <span>{props.name}</span>
      </div>
      {props.children}
    </div>
  )
}
