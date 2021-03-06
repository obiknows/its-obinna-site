import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import Layout from "../components/storeLayout"
import SEO from "../components/seo"

class StoreItemTemplate extends React.Component {
  state = {
    selected: this.props.data.markdownRemark.frontmatter.customField.values[0]
      .name,
  }

  setSelected = value => {
    this.setState({ selected: value })
  }

  updatePrice = (basePrice, values) => {
    const selectedOption = values.find(
      option => option.name === this.state.selected
    )
    return (basePrice + selectedOption.priceChange).toFixed(2)
  }

  createString = values => {
    return values
      .map(option => {
        const price =
          option.priceChange >= 0
            ? `[+${option.priceChange}]`
            : `[${option.priceChange}]`
        return `${option.name}${price}`
      })
      .join("|")
  }

  render() {
    const item = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={`${item.frontmatter.title} ${item.frontmatter.subtitle}`}
          description={item.frontmatter.description || item.excerpt}
        />
        <StoreItemContainer style={{ marginBottom: `10rem` }}>
          {/* Product Photo + Gallery */}
          <div>
            {/* <p>product photo + gallery</p> */}
            <div style={{ textAlign: "center" }}>
              <Img
                fluid={item.frontmatter.thumbnail.childImageSharp.fluid}
                style={{
                  maxWidth: `350px`,
                  marginLeft: `auto`,
                  marginRight: `auto`,
                }}
              />
            </div>
          </div>
          {/* Product Info + Sizing Info + Add to Cart + Buy Now Button */}
          <div>
            <div style={{}}>
              {/* Title + Subtitle */}
              <h5
                style={{
                  fontSize: 36,
                  marginTop: `1rem`,
                  marginBottom: `0rem`,
                  textTransform: `uppercase`,
                }}
              >
                {item.frontmatter.title}
              </h5>
              <p
                style={{
                  fontSize: 22,
                  marginTop: `0rem`,
                  marginBottom: `1rem`,
                  textTransform: `uppercase`,
                  letterSpacing: 2,
                  lineHeight: `initial`,
                }}
              >
                {item.frontmatter.subtitle}
              </p>
              {/* Description */}
              <div
                style={{
                  marginTop: `1rem`,
                  fontSize: 18,
                  color: `rgba(255,255,255,0.66)`,
                }}
              >
                "{item.frontmatter.description}"
              </div>
              {/* Price */}
              <div
                style={{
                  fontWeight: "bolder",
                  backgroundColor: `gold`,
                  color: `black`,
                  width: `max-content`,
                  marginTop: `1rem`,
                  paddingLeft: `1rem`,
                  paddingRight: `1rem`,
                  paddingTop: `0.25rem`,
                  paddingBottom: `0.25rem`,
                }}
              >
                $
                {this.updatePrice(
                  item.frontmatter.price,
                  item.frontmatter.customField.values
                )}
                {/* {item.frontmatter.price} */}
              </div>
              {/* Item Description */}
              <div style={{ marginTop: `1rem` }}>
                <div dangerouslySetInnerHTML={{ __html: item.html }} />
              </div>
              {/* Size Options  */}
              <select
                id={item.frontmatter.customField.name}
                onChange={e => this.setSelected(e.target.value)}
                value={this.state.selected}
                name="size"
                style={{
                  width: `50%`,
                  marginBottom: `1rem`,
                  textTransform: `uppercase`,
                }}
                required
              >
                {item.frontmatter.customField.values.map(option => (
                  <option key={option.name}>{option.name}</option>
                ))}
                {/* <option value="" />
                <option value="first">small</option>
                <option value="second">medium</option>
                <option value="large">large</option>
                <option value="xlarge">x-large</option>
                <option value="xxlarge">xx-large</option> */}
              </select>
              {/* Add to Cart, Buy Now Button,  */}
              <div
                // style={{
                //   backgroundColor: `black`,
                //   fontWeight: 700,
                //   textAlign: `center`,
                //   paddingTop: `1rem`,
                //   paddingBottom: `1rem`,
                //   textTransform: `uppercase`,
                // }}
                style={{
                  backgroundColor: `gold`,
                  fontWeight: 700,
                  color: `black`,
                  textAlign: `center`,
                  marginTop: `1rem`,
                  paddingTop: `1rem`,
                  paddingBottom: `1rem`,
                  textTransform: `uppercase`,
                }}
                className="snipcart-add-item"
                data-item-id={item.frontmatter.id}
                data-item-price={item.frontmatter.price}
                data-item-name={item.frontmatter.title}
                data-item-description={item.frontmatter.description}
                data-item-image={
                  item.frontmatter.thumbnail.childImageSharp.fluid.src
                }
                data-item-url={"https://itsobinna.com" + item.fields.slug} //REPLACE WITH OWN URL
                data-item-custom1-name={
                  item.frontmatter.customField
                    ? item.frontmatter.customField.name
                    : null
                }
                data-item-custom1-options={this.createString(
                  item.frontmatter.customField.values
                )}
                data-item-custom1-value={this.state.selected}
              >
                Add To Cart
              </div>
              {/* <div
                style={{
                  backgroundColor: `gold`,
                  fontWeight: 700,
                  color: `black`,
                  textAlign: `center`,
                  marginTop: `1rem`,
                  paddingTop: `1rem`,
                  paddingBottom: `1rem`,
                  textTransform: `uppercase`,
                }}
              >
                Buy Now
              </div> */}
            </div>
          </div>
        </StoreItemContainer>

        {/*  */}
      </Layout>
    )
  }
}

// STYLED COMPONENTS
const StoreItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-column-gap: 4rem;
  grid-row-gap: 4rem;
  margin-top: 4rem;
  margin-right: 4rem;
  margin-left: 4rem;

  @media (max-width: 1050px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 750px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

export default StoreItemTemplate

export const pageQuery = graphql`
  query StoreItemBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        id
        title
        subtitle
        price
        date(formatString: "MMMM DD, YYYY")
        description
        customField {
          name
          values {
            name
            priceChange
          }
        }
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
