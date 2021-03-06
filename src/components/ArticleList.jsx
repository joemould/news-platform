import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import * as api from '../api';
import Grid from '@material-ui/core/Grid';

export default class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true
  };

  componentDidMount() {
    const { topic } = this.props;

    api.getAllArticles(topic).then(articles => {
      this.setState({ articles, isLoading: false });
    });
  }

  componentDidUpdate(prevProps) {
    const { topic } = this.props;

    if (this.props !== prevProps) {
      api.getAllArticles(topic).then(articles => {
        this.setState({ articles });
      });
    }
  }

  render() {
    const { articles, isLoading } = this.state;

    return (
      <main className="article-list">
        {isLoading ? (
          <p>loading...</p>
        ) : (
          <Grid container justify="center" spacing={3}>
            {articles.map(article => {
              return (
                <ArticleCard
                  className="article"
                  key={article.article_id}
                  article={article}
                />
              );
            })}
          </Grid>
        )}
      </main>
    );
  }
}
