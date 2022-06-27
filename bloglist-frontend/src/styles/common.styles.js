import styled from "styled-components";
import { Link } from "react-router-dom";

export const Navigation = styled.div`
  background: BurlyWood;
  padding: 2em;
  width: 100%;
  text-align: center;
`;

export const NavigationItem = styled.a`
  background: BurlyWood;
  padding-right: 0.5em;
  text-decoration: none;
  
`;

export const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  margin: 0.2em;
`;

export const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bold;
  margin: "auto";
  width: "50%";
`;

export const CenterUL = styled.ul` 
& .list {
  list-style-type: none;
}
  
`;

export const ListItem = styled.li`
  text-align: center;
  font-size: 1.2rem;
  border: solid 1px;
  margin: 0.5em;
  border-radius: 3px;
  list-style-type: none;
  margin: "auto";
  width: "50%";
`;

export const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;
export const Title = styled.h2`
  font-size: 2em;
`;
export const BlogListing = styled.div`
  text-align: center;
  width: 100%;
`;
export const NewBlogView = styled.div`
    text-align: center;
    width: 100%;
`;
export const HomeView = styled.div`
text-align: center;
width: 100%;
`;